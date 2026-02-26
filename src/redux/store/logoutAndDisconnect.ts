import { AppDispatch, persistor } from '@redux/store';
import { logoutUser } from '@redux/AuthReducer';
import { disconnectWallet } from '@redux/WalletReducer';
import { resetKyc } from '@redux/KYCReducer';
import { clearSiwxSession } from '@utils/siwxSessionStorage';

export const logoutAndDisconnect = () => async (dispatch: AppDispatch) => {
  dispatch(logoutUser());
  dispatch(resetKyc());
  dispatch(disconnectWallet());

  await clearSiwxSession();
  await persistor.purge();
};
