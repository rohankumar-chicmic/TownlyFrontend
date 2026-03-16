import useTheme from '@hooks/useTheme';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import { View, Text, Pressable, ViewStyle, Dimensions } from 'react-native';
import Button from '../Button';

import React, { useEffect } from 'react';
import { useGetBalanceQuery } from '@redux/ApiReducer';
import { useAppNavigation } from '@hooks/useNavigation';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';
import { useAppSelector } from '@redux/store';
import {
  useAccountBalance,
  saveAccountBalance,
} from 'src/db/hooks/useWalletScreenData';

interface ConnectButtonPropsType {
  style?: ViewStyle;
}

function ConnectButton(props: Readonly<ConnectButtonPropsType>) {
  const { Colors } = useTheme();
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const userToken = useAppSelector(state => state.auth.userToken);
  const userAddress = useAppSelector(
    state => state.auth.userData?.walletAddress,
  );
  console.log(userToken);
  const navigation = useAppNavigation();
  const { data, isLoading } = useGetBalanceQuery(undefined, {
    skip: !userToken || !isConnected,
  });

  useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });

  const { data: balance } = useAccountBalance(String(address));

  useEffect(() => {
    if (data?.available !== undefined && data?.available !== null && address) {
      try {
        saveAccountBalance(data.available);
      } catch (err) {
        console.error('❌ DB Write Failed:', err);
      }
    }
  }, [data?.available, address]);

  const displayBalance = data?.available ?? balance?.availableBalance ?? null;

  if (userToken) {
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
            {isLoading && !displayBalance && 'loading...'}

            {displayBalance !== null ? `${displayBalance} ETH, ` : '... '}
            {userAddress ?? ' '}
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
