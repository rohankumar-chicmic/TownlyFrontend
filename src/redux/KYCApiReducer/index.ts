import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@utils/constants';
import { KYC_STATUS } from '@redux/KYCReducer';

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
      const token = (getState() as any)?.auth?.userToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['KYC'],
  endpoints: builder => ({
    submitKYC: builder.mutation<KYCSubmitResponse, FormData>({
      query: (formData: FormData) => ({
        url: '/kyc/submit',
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['KYC'],
    }),

    getKYCStatus: builder.query<GetKYCStatusResponse, void>({
      query: () => '/kyc/me/status',
      providesTags: ['KYC'],
    }),
  }),
});

export const { useSubmitKYCMutation, useGetKYCStatusQuery } = kycApi;
