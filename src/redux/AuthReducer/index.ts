import { THEME } from '@theme/constants';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  userToken: string | undefined;
  userData: any;
  theme: THEME;
  kycStatus: number;
  unreadNotifications: boolean;
}

const initialState: InitialStateType = {
  userToken: undefined,
  userData: undefined,
  theme: THEME.DEVICE,
  unreadNotifications: false,
  kycStatus: 0,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log('LOGIN PAYLOAD:', action.payload);
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
      state.unreadNotifications = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setTheme, hasUnreadNotifications } =
  authReducer.actions;

export default authReducer.reducer;
