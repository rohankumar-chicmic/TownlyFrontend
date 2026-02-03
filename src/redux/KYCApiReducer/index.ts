// KYCApiReducer.ts
// Add this to your existing API reducer or create a new one

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@utils/constants';
import { KYC_STATUS } from '@redux/KYCReducer';

interface KYCSubmitRequest {
  FullName: string;
  DateOfBirth: string; // ISO string format
  FullAddress: string;
  DocumentType: string;
  DocumentUrl: string;
  SelfieUrl: string;
}

interface KYCSubmitResponse {
  success: boolean;
  message: string;
  kycId?: string;
}

interface GetKYCStatusResponse {
  status: KYC_STATUS;
  statusCode: number;
  submittedAt: string | null;
  rejectionReason: string | null;
}

export const kycApi = createApi({
  reducerPath: 'kycApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_URL || API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if needed
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['KYC'],
  endpoints: builder => ({
    submitKYC: builder.mutation<KYCSubmitResponse, KYCSubmitRequest>({
      query: body => ({
        url: '/kyc/submit',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['KYC'],
    }),

    getKYCStatus: builder.query<GetKYCStatusResponse, void>({
      query: () => '/api/kyc/me/status',
      providesTags: ['KYC'],
    }),
  }),
});

export const { useSubmitKYCMutation, useGetKYCStatusQuery } = kycApi;
