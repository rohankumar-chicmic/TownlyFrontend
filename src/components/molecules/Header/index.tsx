import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import ConnectButton from '@components/atoms/ConnectButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { THEME } from '@theme/constants';
import { useNetInfo } from '@react-native-community/netinfo';

export default function Header({
  route,
  options,
  navigation,
}: Readonly<BottomTabHeaderProps>) {
  const { dynamicStyles, Colors, toggleTheme, currentTheme } =
    useStyles(styles);
  const { isConnected } = useNetInfo();

  return (
    <View>
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
      {!isConnected && (
        <View
          style={[
            {
              width: '100%',
              backgroundColor: Colors.primary,
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'center',
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
        >
          <Text style={{ textAlign: 'center', color: Colors.background }}>
            You Are Currently Offline
          </Text>
        </View>
      )}
    </View>
  );
}
