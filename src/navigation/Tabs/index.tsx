import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { Icons } from '@utils/icons';
import Header from '@components/molecules/Header';

import { ROUTES } from '../constants';
import useTheme from '@hooks/useTheme';

import Home from '@screens/Home';
import Marketplace from '@screens/Marketplace';
import Portfolio from '@screens/Portfolio';
import Notifications from '@screens/Notifications';
import { View } from 'react-native';
import { useAppSelector } from '@redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Tabs() {
  const { Colors } = useTheme();
  const userToken = useAppSelector(state => state.auth.userToken);

  const unreadNotifcations = useAppSelector(
    state => state.auth.unreadNotifications,
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.surface }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: props => <Header {...props} />,

          headerTintColor: Colors.primary,
          sceneStyle: {
            backgroundColor: Colors.background,
          },
          tabBarStyle: {
            backgroundColor: Colors.surface,
            borderTopColor: Colors.border,
            height: 60,
          },
          tabBarItemStyle: {
            height: 10,
            width: 10,
            margin: 8,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textMuted,
        })}
      >
        <Tab.Screen
          name={ROUTES.HOME}
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.Home width={size} height={size} borderColor={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.MARKETPLACE}
          component={Marketplace}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.Marketplace
                width={size}
                height={size}
                borderColor={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.PORTFOLIO}
          component={Portfolio}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.Portfolio width={size} height={size} borderColor={color} />
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.NOTIFICATIONS}
          component={Notifications}
          options={{
            tabBarIcon: ({ color, size }) => (
              <View>
                {userToken && unreadNotifcations && (
                  <View
                    style={{
                      height: 15,
                      width: 15,
                      backgroundColor: 'red',
                      position: 'absolute',
                      zIndex: 100,
                      right: 0,
                      borderRadius: 8,
                      borderColor: Colors.surface,
                      borderWidth: 3,
                    }}
                  ></View>
                )}
                <Icons.BellIcon width={28} height={28} borderColor={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
