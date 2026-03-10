import '@walletconnect/react-native-compat';
import 'react-native-get-random-values';
import { Buffer } from 'buffer';

import { useEffect } from 'react';
import { Text, TextInput, TextStyle } from 'react-native';

import { preloadFonts } from '@utils/constants';
import { preloadImages } from '@utils/images';

import RootNavigator from './src/navigation/RootNavigator';
import store, { persistor } from './src/redux/store';
import './src/localization';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from 'src/db/client';
import migrations from './drizzle/migrations';

import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { appKit, wagmiAdapter } from './src/AppkitConfig'; // Your configured AppKit instance
import { AppKitProvider, AppKit } from '@reown/appkit-react-native';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useOfflineQueue from 'src/db/hooks/useOfflineQueue';

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

  useEffect(() => {
    (async () => {
      preloadImages();
      await preloadFonts();
      await migrate(db, migrations);
      SplashScreen.hideAsync();
    })();
  }, []);

  useOfflineQueue();

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <AppKitProvider instance={appKit}>
          <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
              <Provider store={store}>
                <PersistGate persistor={persistor}>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <RootNavigator />
                    <AppKit />
                  </GestureHandlerRootView>
                </PersistGate>
              </Provider>
            </QueryClientProvider>
          </WagmiProvider>
        </AppKitProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
