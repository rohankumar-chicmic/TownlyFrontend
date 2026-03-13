import React, { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from '@redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetMyUnreadNotificationsQuery } from '@redux/NotificationsApiReducer';
import { setUnreadNotifications } from '@redux/AuthReducer';
import { useNetInfo } from '@react-native-community/netinfo';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Tabs() {
  const { Colors } = useTheme();
  const userToken = useAppSelector(state => state.auth.userToken);
  const dispatch = useAppDispatch();

  const { data: unreadData } = useGetMyUnreadNotificationsQuery(
    { page: 1, pageSize: 1 },
    { skip: !userToken, refetchOnMountOrArgChange: true },
  );
  const unreadNotifcations = useAppSelector(
    state => state.auth.unreadNotificationsCount,
  );
  const { isConnected } = useNetInfo();
  useEffect(() => {
    if (unreadData?.totalCount !== undefined) {
      dispatch(setUnreadNotifications(Number(unreadData.totalCount)));
    }
  }, [unreadData, dispatch]);

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
                {userToken  && unreadNotifcations > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -3,
                      right: -3,
                      height: 15,
                      width: 15,
                      backgroundColor: 'red',
                      zIndex: 100,
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
