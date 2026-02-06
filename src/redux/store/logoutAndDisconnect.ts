import { AppDispatch } from '@redux/store';
import { logoutUser } from '@redux/AuthReducer';
import { disconnectWallet } from '@redux/WalletReducer';

export const logoutAndDisconnect =
  () => (dispatch: AppDispatch) => {
    dispatch(logoutUser());
    dispatch(disconnectWallet());
  };
