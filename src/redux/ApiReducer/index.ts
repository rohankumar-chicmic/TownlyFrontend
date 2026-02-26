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

    getTransactions: builder.query({
      query: params => ({
        url: `/transactions/me`,
        method: 'GET',
        params,
      }),

      serializeQueryArgs: ({ queryArgs }) => {
        // If it's the main transactions screen (pageSize 10),
        // we cache it by type so we can merge pages.
        if (queryArgs.pageSize > 5) {
          return `infinite-list-${queryArgs.type}`;
        }
        // For the portfolio preview (pageSize 4),
        // keep it as a separate cache entry.
        return `preview-list`;
      },

      merge: (currentCache, newItemData, { arg }) => {
        if (arg.page === 1) {
          return newItemData;
        }
        return {
          ...currentCache,
          items: [...currentCache.items, ...newItemData.items],
          hasMore: newItemData.hasMore,
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
