import { createAppKit } from '@reown/appkit-react-native';
import { WagmiAdapter } from '@reown/appkit-wagmi-react-native';
import { mainnet, sepolia } from 'wagmi/chains';
import storage from './storage';
import { siwx } from './siwxConfig';

const IS_DEV = process.env.APP_VARIANT === 'development';

const projectId = '9e773ea4be62417831636eb61b17c107';

const APP_NAME = IS_DEV ? 'townly-dev' : 'townly';
const APP_SCHEME = IS_DEV ? 'townly-dev' : 'townly';
const APP_URL = 'https://townly.app'; // replace if different
const UNIVERSAL_LINK = 'townly.app'; // must match Expo universal links config

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet, sepolia],
});

export const appKit = createAppKit({
  projectId,
  networks: [mainnet, sepolia],
  adapters: [wagmiAdapter],
  storage,
  siwx,
  metadata: {
    name: APP_NAME,
    description: 'Townly decentralized application',
    url: APP_URL,
    icons: [`${APP_URL}/icon.png`],

    redirect: {
      native: `${APP_SCHEME}://`,
      universal: UNIVERSAL_LINK,
    },
  },
});
