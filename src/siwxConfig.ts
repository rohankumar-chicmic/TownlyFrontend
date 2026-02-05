// siwx.config.ts
import { type SIWXConfig, type SIWXSession } from '@reown/appkit-react-native';
import store from '@redux/store';
import { SIWXMessage } from '@reown/appkit-react-native';
import { authApi } from '@redux/ApiReducer';
import { loginUser, logoutUser } from '@redux/AuthReducer';

import {
  saveSiwxSession,
  getSiwxSession,
  getSiwxToken,
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
      })
    );
    
    store.dispatch(
      connectWallet({
        address: session.data.accountAddress,
        chainId: session.data.chainId,
      })
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
    console.log('setSessions called with:', sessions.length, 'sessions');
    
    if (!sessions.length) {
      console.log('No sessions - logging out');
      await clearSiwxSession();
      store.dispatch(logoutUser());
      return;
    }

    const newSession = sessions[0];
    const savedSession = await getSiwxSession();
    const savedToken = await getSiwxToken();

    console.log('New wallet:', newSession.data.accountAddress);
    console.log('Saved wallet:', savedSession?.data.accountAddress);

    // Check if wallet address has changed
    const walletChanged = savedSession && 
      savedSession.data.accountAddress.toLowerCase() !== newSession.data.accountAddress.toLowerCase();

    if (walletChanged) {
      console.log('Wallet changed - clearing old session and token');
      await clearSiwxSession();
      // Don't restore token - user needs to sign with new wallet
      store.dispatch(
        loginUser({
          walletAddress: newSession.data.accountAddress,
          // No token - will trigger re-authentication
        })
      );
      return;
    }

    // Same wallet - restore session and token
    if (savedToken && savedSession) {
      console.log('Restoring session for same wallet');
      await saveSiwxSession(newSession, savedToken);
      
      store.dispatch(
        loginUser({
          token: savedToken,
          walletAddress: newSession.data.accountAddress,
        })
      );
    } else {
      console.log('No saved token - need to authenticate');
      await saveSiwxSession(newSession);
      store.dispatch(
        loginUser({
          walletAddress: newSession.data.accountAddress,
        })
      );
    }
  },

  getRequired: () => true,

  signOutOnDisconnect: true,
};