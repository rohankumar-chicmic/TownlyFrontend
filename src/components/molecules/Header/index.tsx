import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import ConnectButton from '@components/atoms/ConnectButton';

export default function Header({
  route,
  options,
  navigation,
}: Readonly<BottomTabHeaderProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const insets = useSafeAreaInsets();
  const userToken = 10;

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
      {userToken ? <ConnectButton style={dynamicStyles.walletButton} /> : <></>}
    </View>
  );
}
