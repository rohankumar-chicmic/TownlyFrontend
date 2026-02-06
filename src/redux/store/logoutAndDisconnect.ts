import { AppDispatch } from '@redux/store';
import { logoutUser } from '@redux/AuthReducer';
import { disconnectWallet } from '@redux/WalletReducer';
import { resetKyc } from '@redux/KYCReducer';

export const logoutAndDisconnect = () => (dispatch: AppDispatch) => {
  dispatch(logoutUser());
  dispatch(resetKyc());
  dispatch(disconnectWallet());
};
