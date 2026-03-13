import { authApi } from '@redux/ApiReducer';
import { propertyApi } from '@redux/PropertyApiReducer';
import store from '@redux/store';
import { OfflineTask, OfflineTaskType } from '@utils/types';

export async function processOfflineTask(task: OfflineTask) {
  const payload = JSON.parse(task.payload);

  switch (task.type) {
    case OfflineTaskType.CREATE_PROPERTY: {
      await store.dispatch(
        propertyApi.endpoints.makeProperty.initiate({
          data: payload.data,
          token: payload.token,
        }),
      );
      break;
    }

    case OfflineTaskType.EDIT_PROPERTY: {
      await store.dispatch(
        propertyApi.endpoints.editProperty.initiate({
          propertyId: payload.propertyId,
          data: payload.data,
        }),
      );
      break;
    }

    case OfflineTaskType.RESUBMIT_PROPERTY: {
      await store.dispatch(
        propertyApi.endpoints.resubmitProperty.initiate({
          propertyId: payload.propertyId,
          data: payload.data,
        }),
      );
      break;
    }

    case OfflineTaskType.REQUEST_TOKEN: {
      await store.dispatch(
        authApi.endpoints.requestCurrency.initiate(payload.tokens),
      );
      break;
    }

    case OfflineTaskType.DELETE_PROPERTY: {
      await store.dispatch(
        propertyApi.endpoints.deleteProperty.initiate(payload.propertyId),
      );
      break;
    }
  }
}
