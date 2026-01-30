import packageJson from './package.json';

import type { ExpoConfig } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';

const BUNDLE_IDENTIFIER = 'com.townly.townly';

const config: ExpoConfig = {
  name: IS_DEV ? 'townly-dev' : 'townly',
  slug: 'townly',
  scheme: IS_DEV ? 'townly-dev' : 'townly',
  version: packageJson.version,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: BUNDLE_IDENTIFIER,
    googleServicesFile: './GoogleService-Info.plist',
    infoPlist: {
      UIBackgroundModes: ['remote-notification'],
    },
    entitlements: {
      'aps-environment': 'production',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: BUNDLE_IDENTIFIER,
    googleServicesFile: './google-services.json',
    permissions: ['RECEIVE_BOOT_COMPLETED'],
  },
  extra: {
    APP_VARIANT: process.env.APP_VARIANT,
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
  experiments: { reactCompiler: true },
  plugins: [
    [
      'expo-dev-client',
      {
        launchMode: 'most-recent',
      },
    ],
    'expo-asset',
    'expo-font',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
          forceStaticLinking: ['RNFBApp'],
        },
      },
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/messaging',
  ],
};

export default config;
