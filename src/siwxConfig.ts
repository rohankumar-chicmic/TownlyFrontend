// siwx.config.ts
import { type SIWXConfig, type SIWXSession } from '@reown/appkit-react-native';
import store from '@redux/store';
import { SIWXMessage } from '@reown/appkit-react-native';
import { authApi } from '@redux/ApiReducer';
import { loginUser, logoutUser } from '@redux/AuthReducer';

const IS_DEV = process.env.APP_VARIANT === 'development';
const SIWX_DOMAIN = 'com.townly.townly';
const SIWX_URI = IS_DEV ? 'townly-dev' : 'townly';

export const siwx: SIWXConfig = {
  createMessage: async (input): Promise<SIWXMessage> => {
    console.log(
      ' ===============================',
      input.chainId,
      input.accountAddress,
    );
    const chainId = Number(input.chainId.split(':')[1]);
    console.log(' ===============================', chainId);

    const result = await store
      .dispatch(
        authApi.endpoints.generateNonce.initiate({
          walletAddress: input.accountAddress,
          chainId: chainId,
        }),
      )
      .unwrap();

    const issuedAt = new Date().toISOString();

    const message: SIWXMessage = {
      accountAddress: input.accountAddress,
      chainId: input.chainId,

      domain: SIWX_DOMAIN,
      uri: SIWX_URI,
      version: '1',
      nonce: result.data.nonce,
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

    await store
      .dispatch(
        authApi.endpoints.verifySignature.initiate({
          walletAddress: session.data.accountAddress,
          signature: session.signature,
          message: session.message,
          chainId,
        }),
      )
      .unwrap();

    store.dispatch(
      loginUser({
        walletAddress: session.data.accountAddress,
      }),
    );
  },

  getSessions: async () => {
    return [];
  },

  revokeSession: async () => {
    store.dispatch(logoutUser());
  },

  setSessions: async (sessions: SIWXSession[]) => {
    if (!sessions.length) {
      store.dispatch(logoutUser());
      return;
    }

    store.dispatch(
      loginUser({
        walletAddress: sessions[0].data.accountAddress,
      }),
    );
  },

  getRequired: () => true,

  signOutOnDisconnect: true,
};
