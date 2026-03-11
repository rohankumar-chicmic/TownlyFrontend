import { useEffect, useState } from 'react';
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
  const [isOffline, setIsOffline] = useState(false);
  const [localData, setLocalData] = useState<any | null>(null);
  const { isConnected } = useNetInfo();
  const { data: apiData, isLoading: apiLoading } = useGetMyPropertyDetailsQuery(
    id,
    {
      skip: !!isConnected,
    },
  );

  const fetchLocal = async () => {
    try {
      const prop = await db
        .select()
        .from(myProperties)
        .where(eq(myProperties.id, id))
        .get();

      if (!prop) return setLocalData(null);

      const docs = await db
        .select()
        .from(propertyDocuments)
        .where(eq(propertyDocuments.propertyId, prop.id))
        .all();

      setLocalData({ ...prop, documents: docs });
    } catch (err) {
      console.error('Error fetching local property:', err);
      setLocalData(null);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOffline) {
      fetchLocal();
      const interval = setInterval(fetchLocal, 2000);
      return () => clearInterval(interval);
    }
  }, [isOffline, id]);

  console.log(localData);
  return {
    data: isOffline ? localData : apiData,
    isLoading: isOffline ? !localData : apiLoading,
    isOffline,
  };
};

export const saveListedPropertiesDetails = async (propertyIds: string[]) => {
  try {
    for (const id of propertyIds) {
      const property = await store
        .dispatch(propertyApi.endpoints.getMyPropertyDetails.initiate(id))
        .unwrap();

      if (!property) continue;

      const result = await db.transaction(async tx => {
        await tx
          .delete(propertyDocuments)
          .where(eq(propertyDocuments.propertyId, property.id))
          .execute();
        await tx
          .delete(myProperties)
          .where(eq(myProperties.id, property.id))
          .execute();

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
          .onConflictDoUpdate({
            target: myProperties.id,
            set: {
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
            },
          });

        if (property.documents?.length > 0) {
          for (const doc of property.documents) {
            await tx.insert(propertyDocuments).values({
              propertyId: property.id,
              title: doc.title,
              fileName: doc.fileName,
              documentUrl: doc.documentUrl,
            });
          }
        }

        return property;
      });

      console.log(`Property ${property.name} saved locally.`);
    }
  } catch (error) {
    console.error('Error saving listed properties:', error);
  }
};
