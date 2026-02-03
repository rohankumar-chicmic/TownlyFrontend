import { kycApi } from '@redux/KYCApiReducer';
import { createSlice } from '@reduxjs/toolkit';

export enum KYC_STATUS {
  NOT_STARTED = 0,
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
}

interface KycState {
  status: KYC_STATUS;
  submittedAt?: string | null;
  rejectionReason?: string | null;
}

const initialState: KycState = {
  status: KYC_STATUS.NOT_STARTED,
  submittedAt: null,
  rejectionReason: null,
};

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    resetKyc: () => initialState,
  },
  extraReducers: builder => {
    builder.addMatcher(
      kycApi.endpoints.getKYCStatus.matchFulfilled,
      (state, { payload }) => {
        state.status = payload.status;
        state.submittedAt = payload.submittedAt ?? null;
        state.rejectionReason = payload.rejectionReason ?? null;
      },
    );
  },
});

export const { resetKyc } = kycSlice.actions;
export default kycSlice.reducer;
