import { AppDispatch } from '@redux/store';
import { loginUser } from '@redux/AuthReducer';
import { connectWallet } from '@redux/WalletReducer';

export const logoutAndDisconnect = () => (dispatch: AppDispatch) => {
  dispatch(loginUser());
  dispatch(connectWallet());
};
