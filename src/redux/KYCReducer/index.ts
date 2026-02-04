import { kycApi } from '@redux/KYCApiReducer';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

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
      (state, action) => {
        state.status = action.payload.status;
        state.submittedAt = action.payload.submittedAt;
        state.rejectionReason = action.payload.rejectionReason;
      },
    );
  },
});

export const { resetKyc } = kycSlice.actions;

export const selectKycState = (state: RootState) => state.kyc;

export const selectKycStatus = (state: RootState) => state.kyc.status;

export default kycSlice.reducer;
