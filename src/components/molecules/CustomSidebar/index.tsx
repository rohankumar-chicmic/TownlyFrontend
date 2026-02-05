import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAppNavigation } from '@hooks/useNavigation';
import { useAppSelector, useAppDispatch } from '@redux/store';
import useTheme from '@hooks/useTheme';
import { useAppKit } from '@reown/appkit-react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { useRequestCurrencyMutation } from '@redux/ApiReducer';

export default function CustomSidebar(props: any) {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const { Colors, toggleTheme} = useTheme();
  const { disconnect } = useAppKit();
  const { dynamicStyles } = useStyles(styles);
  const {requestCurrency} = useRequestCurrencyMutation();
  const user = useAppSelector(state => state.auth.userData);

  const menu = [
    {
      label: 'Toggle Theme',
      onPress: () => toggleTheme(),
    },
    {
        label: 'Request Currency', 
        onPress: () => {},
    }
  ];

  const handleLogout = () => {};

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: Colors.surface }}
    >
      <View style={[dynamicStyles.profileSection, { borderColor: Colors.border }]}>

        {user && <Text style={[dynamicStyles.name, { color: Colors.primary, textAlign: 'center' }]}>
          {user.walletAddress}
        </Text>}
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        {menu.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              dynamicStyles.menuItem,
              {
                backgroundColor: pressed ? Colors.surface : 'transparent',
              },
            ]}
            onPress={item.onPress}
          >
            <Text style={dynamicStyles.icon}>{item.icon}</Text>
            <Text style={[dynamicStyles.menuText, { color: Colors.textPrimary }]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <Pressable
        style={({ pressed }) => [
          dynamicStyles.logout,
          {
            backgroundColor: pressed ? Colors.surface : Colors.background,
          },
        ]}
        onPress={handleLogout}
      >
        <Text style={[dynamicStyles.logoutText]}>Disconnect</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
}
