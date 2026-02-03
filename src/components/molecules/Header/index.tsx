import { View, Text, Pressable } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import ConnectButton from '@components/atoms/ConnectButton';
import store, { useAppSelector } from '@redux/store';

interface headerProps extends BottomTabHeaderProps {
  drawerOpened: boolean;
  setDrawerOpened: Dispatch<SetStateAction<boolean>>;
}

export default function Header({
  route,
  options,
  navigation,
  drawerOpened,
  setDrawerOpened,
}: Readonly<headerProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();
  const userToken = useAppSelector(state => state.auth.userToken);
  const walletAddress = useAppSelector(state => state.auth.userData?.walletAddress);
  console.log(userToken);
  return (
    <View
      style={[
        dynamicStyles.container,
        {
          paddingTop: insets.top,
          height: 60 + insets.top,
          width: '100%',
        },
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        <Icons.Logo
          height={30}
          width={60}
          color={Colors.primary}
          borderColor={Colors.border}
        />

        <Text style={dynamicStyles.primaryText}>Townly</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ConnectButton style={dynamicStyles.walletButton} />
        <Pressable
          onPress={() => setDrawerOpened(prev => !prev)}
          style={{
            marginLeft: 10,
            borderRadius: 5,
            backgroundColor: drawerOpened ? Colors.elevated : Colors.surface,
          }}
        >
          <View style={{ margin: 10 }}>
            <Icons.Drawer
              height={18}
              width={18}
              color={drawerOpened ? Colors.primary : Colors.primaryDark}
            ></Icons.Drawer>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
