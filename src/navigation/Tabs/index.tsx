import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { Icons } from '@utils/icons';
import Header from '@components/molecules/Header';

import { ROUTES } from '../constants';
import useTheme from '@hooks/useTheme';

import Home from '@screens/Home';
import Marketplace from '@screens/Marketplace';
import Portfolio from '@screens/Portfolio';
import { useNavigation } from '@react-navigation/native';
import Notifications from '@screens/Notifications';
import Feather from '@expo/vector-icons/Feather';
import { View } from 'react-native';
import { useAppSelector } from '@redux/store';
import { useGetMyUnreadNotificationsQuery } from '@redux/NotificationsApiReducer';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Tabs() {
  const { Colors } = useTheme();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const navigation = useNavigation();
  const userToken = useAppSelector(state => state.auth.userToken);
  const { data } = useGetMyUnreadNotificationsQuery(undefined, {
    skip: !userToken,
  });

  const unreadNotifcations = useAppSelector(
    state => state.auth.unreadNotifcations,
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.elevated }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: props => (
            <Header
              {...props}
              setDrawerOpened={setDrawerOpened}
              onPress={() => navigation.openDrawer()}
              drawerOpened={drawerOpened}
            />
          ),

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
                {((userToken && unreadNotifcations) ||
                  (data && data?.length !== 0)) && (
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
                <Feather name="bell" size={size + 5} color={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
