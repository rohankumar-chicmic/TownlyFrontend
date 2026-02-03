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

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Tabs() {
  const { Colors } = useTheme();
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: props => (
          <Header
            {...props}
            setDrawerOpened={setDrawerOpened}
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
          paddingTop: 10,
        },
        tabBarItemStyle: {
          height: 10,
          width: 10,
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
            <Icons.Marketplace width={size} height={size} borderColor={color} />
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
    </Tab.Navigator>
  );
}
