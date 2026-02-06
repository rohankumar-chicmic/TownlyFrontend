import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import useTheme from '@hooks/useTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { navigationRef } from '@utils/navigationService';
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
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
  useNotification();
  // const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  const userToken = useAppSelector(state => state.auth.userToken);
  useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });
  const { Colors, currentTheme } = useTheme();

  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.background }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        >
          <Stack.Screen name={ROUTES.DRAWER} component={MainDrawerNavigation} />
          <Stack.Screen name={ROUTES.WALLET} component={WalletScreen} />

          <Stack.Screen
            name={ROUTES.PROPERTY_DETAILS}
            component={PropertyDetails}
          />
          <Stack.Screen name={ROUTES.CREATE_NFT} component={CreateNFTScreen} />
          <Stack.Screen name={ROUTES.KYC} component={KYC} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
