import api from '@redux/store/api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    generateNonce: builder.mutation({
      query: () => ({
        url: '/v1/auth/wallet/nonce',
        method: 'POST',
      }),
    }),

    verifySignature: builder.mutation<any, any>({
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
      providesTags: ['InvestmentDetails'],
    }),

    getBalance: builder.query<any, void>({
      query: () => ({
        url: '/tokens/balance',
        method: 'GET',
      }),
      providesTags: ['InvestmentDetails'],
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
      providesTags: ['InvestmentDetails'],
    }),

    getDonutGraphData: builder.query<any, void>({
      query: () => ({
        url: '/analytics/portfolio/me/allocation',
        method: 'GET',
      }),
      providesTags: ['InvestmentDetails'],
    }),

    getTransactions: builder.query<
      { hasMore: boolean; items: any[] },
      { page: number; pageSize: number; type?: number }
    >({
      query: params => ({
        url: `/transactions/me`,
        method: 'GET',
        params,
      }),
      providesTags: ['Transactions']
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
  useGetTransactionsQuery,
  useGetLineGraphDataQuery,
  useGetDonutGraphDataQuery,
} = authApi;

export { authApi };
