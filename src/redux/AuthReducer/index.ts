import { THEME } from '@theme/constants';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';
import { KYC_STATUS } from '@redux/KYCReducer';
interface InitialStateType {
  userToken: string | undefined;
  userData: any;
  theme: THEME;
  unreadNotifcations: boolean;
}

const initialState: InitialStateType = {
  userToken: undefined,
  userData: undefined,
  theme: THEME.DEVICE,
  unreadNotifcations: false,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userData = action.payload;
      state.userToken = action.payload.token;
    },
    logoutUser(state) {
      state.userData = undefined;
      state.userToken = undefined;
    },
    setTheme(state, action: PayloadAction<THEME>) {
      state.theme = action.payload;
    },
    hasUnreadNotifications(state, action) {
      state.unreadNotifcations = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setTheme, hasUnreadNotifications } = authReducer.actions;
export const canUserInvest = (state: RootState) =>
  state.wallet.connected && state.kyc.status === KYC_STATUS.APPROVED;
export default authReducer.reducer;
