// // siwx.config.ts
// import {
//   createAppKit,
//   type SIWXConfig,
//   type SIWXSession,
// } from '@reown/appkit-react-native';
// import store  from '@redux/store';
// import { authApi } from '@redux/ApiReducer';
// import { loginUser, logoutUser } from '@redux/CommonReducer'; 

// export const siwx: SIWXConfig = {
//   createMessage: async input => {
//     const result = await store
//       .dispatch(
//         authApi.endpoints.generateNonce.initiate({
//           walletAddress: input.address,
//         }),
//       )
//       .unwrap();

//     return {
//       message: result.nonceMessage ?? result.message,
//       nonce: result.nonce,
//       accountAddress: input.address,
//       chainId: input.chainId,
//       domain: 'realestateinvesting.app',
//       uri: 'https://realestateinvesting.app',
//       version: '1',
//     };
//   },

//   addSession: async session => {
//     const chainId = Number(session.chainId.split(':')[1]);

//     const result = await store
//       .dispatch(
//         authApi.endpoints.verifySignature.initiate({
//           walletAddress: session.address,
//           signature: session.signature,
//           chainId,
//         }),
//       )
//       .unwrap();

//     store.dispatch(
//       loginUser({
//         token: result.token,
//         walletAddress: session.address,
//         // Add any other fields your backend returns
//       }),
//     );
//   },

//   getSessions: async () => {
//     const state = store.getState();

//     // Check if user is authenticated
//     if (!state.common.userToken || !state.common.userData) {
//       return [];
//     }

//     // Return a session with the wallet address
//     return [
//       {
//         address: state.common.userData,
//       } as SIWXSession,
//     ];
//   },

//   revokeSession: async () => {
//     store.dispatch(logoutUser());
//   },

//   getRequired: () => true,

//   signOutOnDisconnect: true,
// };
