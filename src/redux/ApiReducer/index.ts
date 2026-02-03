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
  }),

  overrideExisting: false,
});

export const { useGenerateNonceMutation, useVerifySignatureMutation } = authApi;

export { authApi };
