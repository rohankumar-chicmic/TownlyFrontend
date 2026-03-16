import '@walletconnect/react-native-compat';
import 'react-native-get-random-values';
import { Buffer } from 'buffer';

import { useEffect } from 'react';
import { ActivityIndicator, Text, TextInput, TextStyle } from 'react-native';

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

import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { appKit, wagmiAdapter } from './src/AppkitConfig'; // Your configured AppKit instance
import { AppKitProvider, AppKit } from '@reown/appkit-react-native';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useOfflineQueue from 'src/db/hooks/useOfflineQueue';
import { View } from 'react-native';
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
function AppInitializer() {
  useOfflineQueue();
  return null;
}

function Loading() {
  return (
    <View>
      <ActivityIndicator size={'large'} />
    </View>
  );
}

export default function App() {
  (Text as unknown as ExtendedText).defaultProps = { allowFontScaling: false };
  (TextInput as unknown as ExtendedTextInput).defaultProps = {
    allowFontScaling: false,
  };

  useEffect(() => {
    (async () => {
      await preloadFonts();
      preloadImages();
      migrate(db, migrations);
      await SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <SafeAreaProvider  initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                  <AppKitProvider instance={appKit}>
                    <RootNavigator />
                    <AppKit />
                    <AppInitializer/>
                  </AppKitProvider>
                </WagmiProvider>
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

// ==========================
// import ScrollBoxAnimation from '@components/jagdeepSir/ScrollAnimation';
// import { View, Dimensions, TouchableOpacity } from 'react-native';
// import Overlapping from '@components/jagdeepSir/Overlapping';
// import NonOverlapping from '@components/jagdeepSir/NonOverlapping';
// import Animated, {
//   useSharedValue,
//   useAnimatedScrollHandler,
// } from 'react-native-reanimated';

// const W = Dimensions.get('window').width;
// // Must match ORIG_BOX math inside NewSphereGroup
// const COLUMN_GAP = 8;
// const OUTER_H_PAD = 30;
// const ORIG_BOX = (W - OUTER_H_PAD * 2 - COLUMN_GAP) / 2.5;
// const V_PAD_TOP = 14;
// const ROW_GAP = 8;
// const V_PAD_BOTTOM = 36;
// const SPHERE_GROUP_HEIGHT = V_PAD_TOP + ORIG_BOX * 2 + ROW_GAP + V_PAD_BOTTOM;

// export default function App() {
//   const scrollY = useSharedValue(0);
//   const scrollHandler = useAnimatedScrollHandler(event => {
//     scrollY.value = event.contentOffset.y;
//   });

//   return (
//     <View style={{ flex: 1, paddingTop: 50 }}>
//       <View style={{ height: SPHERE_GROUP_HEIGHT }}>
//         <TouchableOpacity></TouchableOpacity>
//         <Overlapping
//           mindful={50}
//           direction={'normal'}
//           initDirection={'normal'}
//           perform={50}
//           fuel={50}
//           scrollY={scrollY}
//           restore={50}
//           largestPercentage={50}
//           onPressPerform={() => {}}
//           onPressMindful={() => {}}
//           onPressRestore={() => {}}
//           onPressFuel={() => {}}
//           opacity={1}
//           height={W * 0.38}
//           width={W * 0.38}
//           fillDuration={4000}
//         />
//         <NonOverlapping
//           mindful={50}
//           direction={'normal'}
//           initDirection={'normal'}
//           perform={50}
//           fuel={50}
//           scrollY={scrollY}
//           restore={50}
//           largestPercentage={50}
//           onPressPerform={() => {}}
//           onPressMindful={() => {}}
//           onPressRestore={() => {}}
//           onPressFuel={() => {}}
//           opacity={1}
//           height={W * 0.38}
//           width={W * 0.38}
//           fillDuration={4000}
//         />
//       </View>
//       <Animated.ScrollView
//         onScroll={scrollHandler}
//         scrollEventThrottle={16}
//         style={{ flex: 1 }}
//       >
//         <View style={{ height: 1000 }} />
//       </Animated.ScrollView>
//     </View>
//   );
// }
