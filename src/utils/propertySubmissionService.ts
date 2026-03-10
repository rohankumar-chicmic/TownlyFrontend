import NetInfo from '@react-native-community/netinfo';
import { propertyApi } from '@redux/PropertyApiReducer';
import store from '@redux/store';
import { NFTFormData } from '@screens/CreateNFT/types';
import { db } from 'src/db/client';
import { offlinePropertyDrafts, offlineTasks } from 'src/db/schemas';

export async function submitProperty(formData: NFTFormData, token: string) {
  const network = await NetInfo.fetch();

  if (!network.isConnected) {
    const propertyId = crypto.randomUUID();

    await db.transaction(async tx => {
      await tx.insert(offlinePropertyDrafts).values({
        id: propertyId,
        ...formData,
        updatedAt: Date.now(),
      });

      await tx.insert(offlineTasks).values({
        id: crypto.randomUUID(),
        type: 'CREATE_PROPERTY',
        payload: JSON.stringify({ propertyId }),
        status: 'pending',
        retries: 0,
        createdAt: Date.now(),
      });
    });

    return { offline: true };
  }
  return await store
    .dispatch(
      propertyApi.endpoints.makeProperty.initiate({
        data: formData,
        token,
      }),
    )
    .unwrap();
}
