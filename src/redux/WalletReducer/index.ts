import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  connected: boolean;
  address?: string;
  chainId?: string;
}

const initialState: WalletState = {
  connected: false,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    connectWallet(
      state,
      action: PayloadAction<{ address: string; chainId: string }>,
    ) {
      state.connected = true;
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
    },
    disconnectWallet() {
      return initialState;
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
