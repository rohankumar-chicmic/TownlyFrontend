import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { ICONS } from '@utils/icons';
import Home from '@screens/Home';
import Header from '@components/molecules/Header'
import OnboardingScreen from '@screens/Onboarding';

import { ROUTES } from '../constants';
import useTheme from '@hooks/useTheme';
import Marketplace from '@screens/Marketplace';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function index() {
    const { Colors } = useTheme();
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            // Global Header Style (when shown)
            header: (props) => <Header {...props} />,

            headerTintColor: Colors.primary,

            tabBarStyle: {
                backgroundColor: Colors.surface,
                borderTopColor: Colors.border,
                height: 80,
                paddingTop: 10,
            },
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textMuted,
        })}>

            <Tab.Screen name={ROUTES.HOME} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ICONS.Home width={size} height={size} borderColor={color} />
                    )
                }} />
            <Tab.Screen name={ROUTES.MARKETPLACE} component={Marketplace}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ICONS.Marketplace width={size} height={size} borderColor={color}  />
                    )
                }} />
            <Tab.Screen name={ROUTES.PORTFOLIO} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ICONS.Portfolio width={size} height={size} borderColor={color} />
                    )
                }} />
        </Tab.Navigator>
    )
}
