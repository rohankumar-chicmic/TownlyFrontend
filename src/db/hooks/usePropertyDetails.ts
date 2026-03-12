import { useCallback, useEffect, useState } from 'react';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { db } from '../client';
import { myProperties, propertyDocuments } from '../schemas';
import { eq } from 'drizzle-orm';
import {
  propertyApi,
  useGetMyPropertyDetailsQuery,
} from '@redux/PropertyApiReducer';
import store from '@redux/store';

export const usePropertyDetails = (id: string) => {
  // Initialise as null so we can distinguish "not yet checked" from "checked and offline"
  const [isOffline, setIsOffline] = useState<boolean | null>(null);
  const [localData, setLocalData] = useState<any>(null);

  // FIX 1 — single source of truth for connectivity: derive isOffline only from
  // NetInfo; previously useNetInfo() and NetInfo.addEventListener were both used
  // in separate places, creating a race where they could disagree.
  useEffect(() => {
    // Get the current state immediately on mount so we don't wait for a change event
    NetInfo.fetch().then(state => {
      setIsOffline(!state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const { data: apiData, isLoading: apiLoading } = useGetMyPropertyDetailsQuery(
    id,
    {
      // FIX 2 — skip until we actually know connectivity state (isOffline === null
      // means "not yet checked"). Previously this used a separate useNetInfo()
      // hook which could briefly report the wrong value.
      skip: isOffline !== false,
      refetchOnMountOrArgChange: true,
    },
  );

  // FIX 3 — wrap fetchLocal in useCallback so it's stable across renders and
  // can be safely listed in dependency arrays without causing infinite loops.
  const fetchLocal = useCallback(() => {
    try {
      const prop = db
        .select()
        .from(myProperties)
        .where(eq(myProperties.id, id))
        .get();

      if (!prop) return setLocalData(null);

      const docs = db
        .select()
        .from(propertyDocuments)
        .where(eq(propertyDocuments.propertyId, prop.id))
        .all();

      // FIX 4 — SQLite stores booleans as 0/1 integers. Normalise them here so
      // the offline row looks identical to the API response shape. Previously
      // canDelete/canEditFullProperty etc. came back as numbers, causing the
      // status-dependent UI (edit button, delete button) to behave differently
      // offline vs online.
      setLocalData({
        ...prop,
        canDelete: Boolean(prop.canDelete),
        canEditFullProperty: Boolean(prop.canEditFullProperty),
        canRequestUpdate: Boolean(prop.canRequestUpdate),
        canResubmit: Boolean(prop.canResubmit),
        hasPendingUpdateRequest: Boolean(prop.hasPendingUpdateRequest),
        documents: docs,
      });
    } catch (err) {
      console.error('Error fetching local property:', err);
      setLocalData(null);
    }
  }, [id]);

  // FIX 5 — previously this only triggered when isOffline *changed*, so if the
  // app launched offline (isOffline went null → true in one tick) the effect
  // would fire, but if the component mounted *after* the state was already true
  // the effect was skipped entirely, showing stale/empty data.
  // Now we run fetchLocal whenever isOffline is true, including on initial mount.
  useEffect(() => {
    if (isOffline) {
      fetchLocal();
    }
  }, [isOffline, id, fetchLocal]);

  const resolvedOffline = isOffline ?? false;

  return {
    data: resolvedOffline ? localData : apiData,
    // While connectivity state is still being determined, treat as loading
    isLoading:
      isOffline === null
        ? true
        : resolvedOffline
          ? localData === null
          : apiLoading,
    isOffline: resolvedOffline,
  };
};

export const saveListedPropertiesDetails = async (propertyIds: string[]) => {
  try {
    for (const id of propertyIds) {
      const property = await store
        .dispatch(propertyApi.endpoints.getMyPropertyDetails.initiate(id))
        .unwrap();

      if (!property) continue;

      await db.transaction(async tx => {
        // FIX 6 — previously only propertyDocuments were deleted before the
        // upsert, but documents have no onConflictDoUpdate guard. On a second
        // save run the insert would add duplicate rows. Now we delete documents
        // first (FK constraint order), then delete the property row, then do a
        // clean insert for both — no stale data, no duplicates.
        await tx
          .delete(propertyDocuments)
          .where(eq(propertyDocuments.propertyId, id))
          .execute();

        await tx.delete(myProperties).where(eq(myProperties.id, id)).execute();

        await tx
          .insert(myProperties)
          .values({
            id: property.id,
            name: property.name,
            description: property.description,
            location: property.location,
            propertyType: property.propertyType,
            status: property.status,
            annualYieldPercent: property.annualYieldPercent,
            totalValue: property.totalValue,
            pricePerUnit: property.pricePerUnit,
            pricePerUnitEth: property.pricePerUnitEth,
            rentalIncomeHistory: property.rentalIncomeHistory,
            totalUnits: property.totalUnits,
            availableUnits: property.availableUnits,
            riskScore: property.riskScore,
            demandScore: property.demandScore,
            imageUrl: property.imageUrl,
            canDelete: property.canDelete,
            canEditFullProperty: property.canEditFullProperty,
            canRequestUpdate: property.canRequestUpdate,
            canResubmit: property.canResubmit,
            hasPendingUpdateRequest: property.hasPendingUpdateRequest,
            rejectionReason: property.rejectionReason,
          })
          .execute();

        if (property.documents?.length > 0) {
          await tx.insert(propertyDocuments).values(
            property.documents.map(doc => ({
              propertyId: property.id,
              title: doc.title,
              fileName: doc.fileName,
              documentUrl: doc.documentUrl,
            })),
          );
        }
      });

      console.log(`Property ${property.name} saved locally.`);
    }
  } catch (error) {
    console.error('Error saving listed properties:', error);
  }
};
