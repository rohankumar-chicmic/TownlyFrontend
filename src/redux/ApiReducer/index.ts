import api from '@redux/store/api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    generateNonce: builder.mutation({
      query: () => ({
        url: '/v1/auth/wallet/nonce',
        method: 'POST',
      }),
    }),

    verifySignature: builder.mutation<void, any>({
      query: body => ({
        url: '/v1/auth/wallet/verify',
        method: 'POST',
        body,
      }),
    }),

    getMyInvestmentDetails: builder.query<any, void>({
      query: () => ({
        url: '/portfolio/me/overview',
        method: 'GET',
      }),
    }),
    getBalance: builder.query<any, void>({
      query: () => ({
        url: '/tokens/balance',
        method: 'GET',
      }),
    }),

    requestCurrency: builder.mutation<void, string>({
      query: amount => ({
        url: '/tokens/requests',
        method: 'POST',
        body: {
          amount: amount,
        },
      }),
    }),

    getLineGraphData: builder.query<any, void>({
      query: () => ({
        url: 'analytics/portfolio/me/line?hours=7',
        method: 'GET',
      }),
    }),

    getDonutGraphData: builder.query<any, void>({
      query: () => ({
        url: '/analytics/portfolio/me/allocation',
        method: 'GET',
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGenerateNonceMutation,
  useVerifySignatureMutation,
  useGetMyInvestmentDetailsQuery,
  useRequestCurrencyMutation,
  useGetBalanceQuery,
  useGetLineGraphDataQuery, 
  useGetDonutGraphDataQuery
} = authApi;

export { authApi };
