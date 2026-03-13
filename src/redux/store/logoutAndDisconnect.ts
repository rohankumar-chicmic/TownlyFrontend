import { logoutUser } from '@redux/AuthReducer';
import { disconnectWallet } from '@redux/WalletReducer';
import { resetKyc } from '@redux/KYCReducer';
import { clearSiwxSession } from '@utils/siwxSessionStorage';
import { clearLocalDataExceptFeatured } from 'src/db/hooks/useProperties';

export const logoutAndDisconnect = () => async (dispatch: any) => {
  dispatch(logoutUser());
  dispatch(resetKyc());
  dispatch(disconnectWallet());

  clearLocalDataExceptFeatured();
  await clearSiwxSession();
};
