// components/ConnectButton.tsx
import useTheme from '@hooks/useTheme';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import { View, Text, Pressable, ViewStyle, Dimensions } from 'react-native';
import Button from '../Button';

import React, { useCallback, useEffect } from 'react';
import { useGetBalanceQuery } from '@redux/ApiReducer';
import { useAppNavigation } from '@hooks/useNavigation';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';
import useNotification from '@hooks/useNotification';
import { useAppSelector } from '@redux/store';

interface ConnectButtonPropsType {
  style?: ViewStyle;
}

function ConnectButton(props: ConnectButtonPropsType) {
  const { Colors } = useTheme();
  const { open, disconnect } = useAppKit();
  const { address, isConnected, chainId } = useAccount();
  const userToken = useAppSelector(state => state.auth.userToken);
  const navigation = useAppNavigation();
  const { data, error } = useGetBalanceQuery(undefined, {
    skip: !userToken,
  });

  if (isConnected) {
    return (
      <View>
        <Pressable
          onPress={() => navigation.navigate('WalletScreen')}
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
            {(data?.available ?? '...') + ' ETH,'}
            {address ?? ' '}
          </Text>
        </Pressable>
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
