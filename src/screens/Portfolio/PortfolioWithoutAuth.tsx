import React from 'react';
import { View, Text } from 'react-native';
import Button from '@components/atoms/Button';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import { useAppKit } from '@reown/appkit-react-native';

export default function PortfolioWithoutAuth() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const { open } = useAppKit();

  return (
    <View
      style={[
        dynamicStyles.container,
        {
          backgroundColor: Colors.background,
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        },
      ]}
    >
      <Text
        style={[
          dynamicStyles.heading,
          { color: Colors.textPrimary, fontSize: 25, fontWeight: '600' },
        ]}
      >
        Login Required
      </Text>

      <Text style={[dynamicStyles.heroText, { textAlign: 'center' }]}>
        Please login or connect your wallet to view your investor portfolio,
        track investments, and manage properties.
      </Text>

      <Button
        title="Connect Wallet"
        onPress={open}
        style={{ marginTop: 20, width: '70%' }}
      />
    </View>
  );
}
