import { useAppSelector } from '@redux/store';
import Tabs from './Tabs'

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';




const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);

  const userToken = useAppSelector(state => state.common.userToken);
  return (
    <SafeAreaProvider >
      <NavigationContainer ref={navigationRef}>
          <Tabs/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
