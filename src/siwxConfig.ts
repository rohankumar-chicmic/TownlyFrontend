// siwx.config.ts
import { type SIWXConfig, type SIWXSession } from '@reown/appkit-react-native';
import store from '@redux/store';
import { SIWXMessage } from '@reown/appkit-react-native';
import { authApi } from '@redux/ApiReducer';
import { loginUser, logoutUser } from '@redux/AuthReducer';

import {
  saveSiwxSession,
  getSiwxSession,
  clearSiwxSession,
} from '@utils/siwxSessionStorage';
import { connectWallet } from '@redux/WalletReducer';

const IS_DEV = process.env.APP_VARIANT === 'development';
const SIWX_DOMAIN = 'com.townly.townly';
const SIWX_URI = IS_DEV ? 'townly-dev://login' : 'https://townly.app';

export const siwx: SIWXConfig = {
  createMessage: async (input): Promise<SIWXMessage> => {
    const result = await store
      .dispatch(authApi.endpoints.generateNonce.initiate(undefined))
      .unwrap();

    const nonce = result.data?.nonce;
    const issuedAt = new Date().toISOString();
    console.log(nonce);

    const message: SIWXMessage = {
      accountAddress: input.accountAddress,
      chainId: input.chainId,
      domain: SIWX_DOMAIN,
      uri: SIWX_URI,
      version: '1',
      nonce: nonce,
      statement: 'Sign in with Ethereum to Townly',
      issuedAt,

      toString() {
        return (
          `${this.domain} wants you to sign in with your Ethereum account:\n` +
          `${this.accountAddress}\n\n` +
          `${this.statement}\n\n` +
          `URI: ${this.uri}\n` +
          `Version: ${this.version}\n` +
          `Chain ID: ${this.chainId}\n` +
          `Nonce: ${this.nonce}\n` +
          `Issued At: ${this.issuedAt}`
        );
      },
    };

    return message;
  },

  addSession: async session => {
    const chainId = Number(session.data.chainId.split(':')[1]);
    console.log(session);

    const result = await store
      .dispatch(
        authApi.endpoints.verifySignature.initiate({
          walletAddress: session.data.accountAddress,
          signature: session.signature,
          message: session.message,
          chainId,
        }),
      )
      .unwrap();

    await saveSiwxSession(session);

    store.dispatch(
      loginUser({
        token: result.data.accessToken,
        walletAddress: session.data.accountAddress,
      }),
      connectWallet({
        address: session.data.accountAddress,
        chainId: session.data.chainId,
      }),
    );
  },

  getSessions: async () => {
    const wcConnected = store.getState().wallet.connected;
    if (!wcConnected) return [];

    const session = await getSiwxSession();
    return session ? [session] : [];
  },

  revokeSession: async () => {
    await clearSiwxSession();
    store.dispatch(logoutUser());
  },

  setSessions: async (sessions: SIWXSession[]) => {
    if (!sessions.length) {
      store.dispatch(logoutUser());
      return;
    }
    await saveSiwxSession(sessions[0]);

    store.dispatch(
      loginUser({
        walletAddress: sessions[0].data.accountAddress,
      }),
    );
  },

  getRequired: () => true,

  signOutOnDisconnect: true,
};
