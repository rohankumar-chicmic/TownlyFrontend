import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
import CustomSidebar from '@components/molecules/CustomSidebar';
import WalletScreen from '@screens/WalletScreen';
import { ROUTES } from './constants';
import { RootStackParamList } from './types';
import { useAppSelector } from '@redux/store';
import useNotification from '@hooks/useNotification';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import { THEME } from '@theme/constants';
import InvestedPropertiesScreen from '@screens/InvestedPropertiesScreen';
import ListedPropertiesScreen from '@screens/ListedPropertiesScreen';
import TransactionsScreen from '@screens/TransactionsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '55%',
        },
        drawerPosition: 'right',
        drawerType: 'back',
      }}
      drawerContent={props => <CustomSidebar {...props} />}
    >
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
}

const RootNavigator = () => {
  // const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  const userToken = useAppSelector(state => state.auth.userToken);
  useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });
  useNotification();
  const { Colors, currentTheme } = useTheme();

  const toastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: Colors.success }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: Colors.text,
        }}
      />
    ),

    error: props => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: Colors.error }}
        text1Style={{
          fontSize: 17,
          color: Colors.text,
        }}
        text2Style={{
          fontSize: 15,
          color: Colors.textSecondary,
        }}
      />
    ),

    info: props => (
      <BaseToast
        {...props}
        style={{
          width: '90%',
          borderLeftColor: Colors.primaryDark,
          borderRightColor: Colors.primaryDark,
          backgroundColor: Colors.border,
          borderColor: Colors.border,
          shadowColor: 'grey',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.7,
          shadowRadius: 4.65,
          elevation: 8,
        }}
        text1Style={{
          color: Colors.textPrimary,
          fontSize: 20,
        }}
      />
    ),
  };

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
          // initialRouteName={ROUTES.INVESTED_PROPERTIES}
        >
          <Stack.Screen name={ROUTES.DRAWER} component={MainDrawerNavigation} />
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
        <Toast config={toastConfig} position="top" swipeable topOffset={120} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
