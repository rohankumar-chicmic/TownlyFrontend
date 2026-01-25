
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import useTheme from '@hooks/useTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

import Tabs from './Tabs';
import PropertyDetails from '@screens/PropertyDetails';

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  const { Colors, currentTheme } = useTheme();

  return (
    <SafeAreaProvider style={{ backgroundColor: Colors.background }}>
      <NavigationContainer ref={navigationRef} >
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        {/* Tabs live here and NEVER unmount */}
        <Stack.Screen name="Tabs" component={Tabs} />

        {/* Details is global */}
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetails}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
