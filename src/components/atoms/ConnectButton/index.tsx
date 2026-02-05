// components/ConnectButton.tsx
import useTheme from '@hooks/useTheme';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import {
  View,
  Text,
  Pressable,
  ViewStyle,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import Button from '../Button';
import { useBalance } from 'wagmi';
import { Address } from 'viem';
import styles from './styles';
import useStyles from '@hooks/useStyles';
// import {
//   useGenerateNonceMutation,
// } from '@redux/ApiReducer';
import React, { useEffect, useState } from 'react';
import BaseModal from '@components/molecules/BaseModal';

interface ConnectButtonPropsType {
  style?: ViewStyle;
}

function ConnectButton(props: ConnectButtonPropsType) {
  const { Colors } = useTheme();
  const { open, disconnect } = useAppKit();
  const { address, isConnected, chainId } = useAccount();
  const balance = useBalance({ address: address as Address });
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const { dynamicStyles } = useStyles(styles);

  if (isConnected) {
    return (
      <View>
        <Pressable
          onPress={() => setShowDisconnectModal(true)}
          style={props.style}
        >
          <Text
            style={{
              color: Colors.textSecondary,
              width: Dimensions.get('screen').width * 0.25,
              fontSize: 12,
            }}
            numberOfLines={1}
          >
            {(balance.data?.value ?? '...') + ' ' + (balance.data?.symbol ?? ' ')}
            {', '}
            {address ?? ' '}
          </Text>
        </Pressable>
        <BaseModal visible={showDisconnectModal}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={dynamicStyles.header}>
              <Text style={dynamicStyles.title}>Confirm Disconnect</Text>
              <Text style={dynamicStyles.subtitle}>
                Your wallet will be disconnected on Confirmation.
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setShowDisconnectModal(false)}
                textStyle={{ color: Colors.primary }}
              ></Button>
              <Button title="Disconnect" onPress={() => disconnect()}></Button>
            </View>
          </ScrollView>
        </BaseModal>
      </View>
    );
  }

  return (
    <Button
      onPress={open}
      title="Connect Wallet"
      size="sm"
      textStyle={{ fontSize: 12, fontWeight: 'bold' }}
    ></Button>
  );
}

export default ConnectButton;
