import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import useTheme from '@hooks/useTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

import Tabs from './Tabs';
import PropertyDetails from '@screens/PropertyDetails';
import CreateNFTScreen from '@screens/CreateNFT';
import KYC from '@screens/KYC';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';
import CustomSidebar from '@components/molecules/CustomSidebar';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerType: 'back'
      }}
      drawerContent={props => <CustomSidebar {...props} />}
    >
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
}

const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useGetKYCStatusQuery();
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
          <Stack.Screen name="Drawer" component={MainDrawerNavigation} />

          <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
          <Stack.Screen name="CreateNft" component={CreateNFTScreen} />
          <Stack.Screen name="KycScreen" component={KYC} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
