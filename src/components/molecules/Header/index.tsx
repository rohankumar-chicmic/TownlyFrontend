import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import ConnectButton from '@components/atoms/ConnectButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { THEME } from '@theme/constants';

export default function Header({
  route,
  options,
  navigation,
}: Readonly<BottomTabHeaderProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors, toggleTheme, currentTheme } = useTheme();

  return (
    <View
      style={[
        dynamicStyles.container,
        {
          paddingVertical: 10,
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <ConnectButton style={dynamicStyles.walletButton} />
        <Pressable
          onPress={toggleTheme}
          style={{ backgroundColor: Colors.surface, borderRadius: 15 }}
        >
          <AntDesign
            name={currentTheme === THEME.LIGHT ? 'sun' : 'moon'}
            size={24}
            color={Colors.primary}
            style={{ padding: 10 }}
          />
        </Pressable>
      </View>
    </View>
  );
}
