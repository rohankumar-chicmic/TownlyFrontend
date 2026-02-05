import api from '@redux/store/api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    generateNonce: builder.mutation({
      query: () => ({
        url: '/v1/auth/wallet/nonce',
        method: 'POST',
      }),
    }),

    verifySignature: builder.mutation({
      query: body => ({
        url: '/v1/auth/wallet/verify',
        method: 'POST',
        body,
      }),
    }),

    getMyInvestmentDetails: builder.query({
      query: () => ({
        url: '/portfolio/me/overview',
        method: 'GET',
      }),
    }),

    requestCurrency: builder.mutation({
      query: (amount) => ({
        url: '/tokens/requests', 
        method: 'POST', 
        body: {
          amount: amount
        }
      }) 
    })
  }),

  overrideExisting: false,
});

export const {
  useGenerateNonceMutation,
  useVerifySignatureMutation,
  useGetMyInvestmentDetailsQuery,
  useRequestCurrencyMutation
} = authApi;

export { authApi };
