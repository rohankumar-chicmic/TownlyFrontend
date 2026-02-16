import '@walletconnect/react-native-compat';
import 'react-native-get-random-values';
import { Buffer } from 'buffer';

import { useEffect } from 'react';
import { TextInput, TextStyle } from 'react-native';

import { preloadFonts } from '@utils/constants';
import { preloadImages } from '@utils/images';

import RootNavigator from './src/navigation/RootNavigator';
import store, { persistor } from './src/redux/store';
import './src/localization';

import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { appKit, wagmiAdapter } from './src/AppkitConfig'; // Your configured AppKit instance
import { AppKitProvider, AppKit } from '@reown/appkit-react-native';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import handleNotification from '@utils/handleNotification';
import useNotification from '@hooks/useNotification';
globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
interface ExtendedText extends Text {
  defaultProps: {
    allowFontScaling: boolean;
    style?: TextStyle;
  };
}

interface ExtendedTextInput extends TextInput {
  defaultProps: {
    allowFontScaling: boolean;
  };
}
export default function App() {
  (Text as unknown as ExtendedText).defaultProps = { allowFontScaling: false };
  (TextInput as unknown as ExtendedTextInput).defaultProps = {
    allowFontScaling: false,
  };
  // Preload images and fonts before rendering the app
  // This ensures that the app is ready to display content without a loading screen
  useEffect(() => {
    (async () => {
      preloadImages();
      await preloadFonts();
      SplashScreen.hideAsync();
    })();
  }, []);

  //the below comment is for f
  // useEffect(() => {
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.warn('App opened from quit by notification:', remoteMessage);
  //         handleNotification(remoteMessage.data);
  //       }
  //     });
  // }, []);

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <AppKitProvider instance={appKit}>
          <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <PersistGate persistor={persistor}>
                  <RootNavigator />
                  <Toast />
                  <AppKit />
                </PersistGate>
              </Provider>
            </QueryClientProvider>
          </WagmiProvider>
        </AppKitProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
