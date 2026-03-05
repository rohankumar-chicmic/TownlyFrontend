import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import useTheme from '@hooks/useTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import {
  flushPendingNavigation,
  navigationRef,
} from '@utils/navigationService';
import Tabs from './Tabs';
import PropertyDetails from '@screens/PropertyDetails';
import CreateNFTScreen from '@screens/CreateNFT';
import KYC from '@screens/KYC';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';
import WalletScreen from '@screens/WalletScreen';
import { ROUTES } from './constants';
import { RootStackParamList } from './types';
import { useAppSelector } from '@redux/store';
import useNotification from '@hooks/useNotification';
import { useAppToastConfig } from '@hooks/useAppToastConfig';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import { THEME } from '@theme/constants';
import InvestedPropertiesScreen from '@screens/InvestedPropertiesScreen';
import ListedPropertiesScreen from '@screens/ListedPropertiesScreen';
import TransactionsScreen from '@screens/TransactionsScreen';
import UserOwnedProperty from '@screens/UserOwnedProperty';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  useReactNavigationDevTools(navigationRef);
  const userToken = useAppSelector(state => state.auth.userToken);
  useGetKYCStatusQuery(undefined, { skip: !userToken });
  useNotification();
  const { Colors, currentTheme } = useTheme();
  const toastConfig = useAppToastConfig();

  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.background }}>
      <StatusBar
        barStyle={
          currentTheme === THEME.DARK ? 'light-content' : 'dark-content'
        }
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          flushPendingNavigation();
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
          // initialRouteName={ROUTES.KYC}
        >
          <Stack.Screen name={ROUTES.TABS} component={Tabs} />
          <Stack.Screen name={ROUTES.WALLET} component={WalletScreen} />
          <Stack.Screen
            name={ROUTES.LISTED_PROPERTIES}
            component={ListedPropertiesScreen}
          />
          <Stack.Screen
            name={ROUTES.INVESTED_PROPERTIES}
            component={InvestedPropertiesScreen}
          />
          <Stack.Screen
            name={ROUTES.OWNED_PROPERTY}
            component={UserOwnedProperty}
          />
          <Stack.Screen
            name={ROUTES.TRANSACTIONS}
            component={TransactionsScreen}
          />
          <Stack.Screen
            name={ROUTES.PROPERTY_DETAILS}
            component={PropertyDetails}
          />
          <Stack.Screen name={ROUTES.CREATE_NFT} component={CreateNFTScreen} />
          <Stack.Screen name={ROUTES.KYC} component={KYC} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} position="top" swipeable />
    </SafeAreaProvider>
  );
};

export default RootNavigator;
