// siwx.config.ts
import { type SIWXConfig, type SIWXSession } from '@reown/appkit-react-native';
import store from '@redux/store';
import { SIWXMessage } from '@reown/appkit-react-native';
import { authApi } from '@redux/ApiReducer';
import { loginUser } from '@redux/AuthReducer';

import {
  saveSiwxSession,
  getSiwxSession,
  getSiwxToken,
  clearSiwxSession,
} from '@utils/siwxSessionStorage';
import { connectWallet } from '@redux/WalletReducer';
import { logoutAndDisconnect } from '@redux/store/logoutAndDisconnect';
import { resetKyc } from '@redux/KYCReducer';

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
    console.log('Adding new session for:', session.data.accountAddress);

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

    const accessToken = result.data.accessToken;

    // Save session with token
    await saveSiwxSession(session, accessToken);

    store.dispatch(
      loginUser({
        token: accessToken,
        walletAddress: session.data.accountAddress,
      }),
    );

    store.dispatch(
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
    const token = await getSiwxToken();

    // 🚨 If token exists but session missing → force cleanup
    if (!session && token) {
      await clearSiwxSession();
      return [];
    }

    return session ? [session] : [];
  },

  setSessions: async (sessions: SIWXSession[]) => {
    console.log('setSessions called with:', sessions.length, 'sessions');

    if (!sessions.length) {
      await clearSiwxSession();
      store.dispatch(logoutAndDisconnect());
      store.dispatch(resetKyc());

      return;
    }

    const newSession = sessions[0];
    const savedSession = await getSiwxSession();
    const savedToken = await getSiwxToken();

    const walletChanged =
      savedSession &&
      savedSession.data.accountAddress.toLowerCase() !==
        newSession.data.accountAddress.toLowerCase();

    const sessionIdChanged = savedSession && savedSession.id !== newSession.id;

    console.log('Wallet changed:', walletChanged);
    console.log('Session changed:', sessionIdChanged);

    // 🚨 If session OR wallet changed → TOKEN INVALID → force re-auth
    if (walletChanged || sessionIdChanged) {
      console.log('Session mismatch — clearing and forcing re-auth');

      await clearSiwxSession();
      await saveSiwxSession(newSession); // save session WITHOUT token

      store.dispatch(
        loginUser({
          walletAddress: newSession.data.accountAddress,
        }),
      );

      return;
    }

    // ✅ Only restore token if session is EXACT SAME
    if (savedToken && savedSession) {
      console.log('Restoring SAME session + token');

      store.dispatch(
        loginUser({
          token: savedToken,
          walletAddress: newSession.data.accountAddress,
        }),
      );
    } else {
      console.log('No token — need auth');

      await saveSiwxSession(newSession);

      store.dispatch(
        loginUser({
          walletAddress: newSession.data.accountAddress,
        }),
      );
    }
  },

  revokeSession: async () => {
    console.log('Hard logout: clearing session + token');

    await clearSiwxSession();

    store.dispatch(logoutAndDisconnect());
    store.dispatch(resetKyc());
  },

  getRequired: () => true,

  signOutOnDisconnect: true,
};
