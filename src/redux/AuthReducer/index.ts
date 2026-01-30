import { THEME } from '@theme/constants';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
  userToken: string | undefined;
  userData: any;
  theme: THEME;
}
const initialState: InitialStateType = {
  userToken: undefined,
  userData: undefined,
  theme: THEME.DEVICE,
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
  },
});

export const { loginUser, logoutUser, setTheme } = authReducer.actions;

export default authReducer.reducer;
