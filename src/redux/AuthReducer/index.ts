import { THEME } from '@theme/constants';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  userToken: string | undefined;
  userData: any;
  theme: THEME;
  kycStatus: number;
  unreadNotificationsCount: number;
}

const initialState: InitialStateType = {
  userToken: undefined,
  userData: undefined,
  theme: THEME.DEVICE,
  unreadNotificationsCount: 0,
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
    setUnreadNotifications(state, action: PayloadAction<number>) {
      state.unreadNotificationsCount = action.payload;
    },

    incrementUnreadNotifications(state) {
      state.unreadNotificationsCount += 1;
    },

    decrementUnreadNotifications(state) {
      if (state.unreadNotificationsCount > 0) {
        state.unreadNotificationsCount -= 1;
      }
    },

    resetUnreadNotifications(state) {
      state.unreadNotificationsCount = 0;
    },
  },
});
export const {
  loginUser,
  logoutUser,
  setTheme,
  setUnreadNotifications,
  incrementUnreadNotifications,
  decrementUnreadNotifications,
  resetUnreadNotifications,
} = authReducer.actions;

export default authReducer.reducer;
