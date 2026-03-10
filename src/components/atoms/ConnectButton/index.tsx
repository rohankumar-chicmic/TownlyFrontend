import useTheme from '@hooks/useTheme';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import { View, Text, Pressable, ViewStyle, Dimensions } from 'react-native';
import Button from '../Button';

import React from 'react';
import { useGetBalanceQuery } from '@redux/ApiReducer';
import { useAppNavigation } from '@hooks/useNavigation';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';
import { useAppSelector } from '@redux/store';
import { useAccountBalance } from 'src/db/hooks/useWalletScreenData';

interface ConnectButtonPropsType {
  style?: ViewStyle;
}

function ConnectButton(props: Readonly<ConnectButtonPropsType>) {
  const { Colors } = useTheme();
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const userToken = useAppSelector(state => state.auth.userToken);
  console.log(userToken);
  const navigation = useAppNavigation();

  const { data, isLoading } = useGetBalanceQuery(undefined, {
    skip: !userToken,
  });

  useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });

  const { data: balance } = useAccountBalance(String(address));

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
            {isLoading && 'loading...'}
            {data?.available
              ? data?.available + ' ETH, '
              : (balance?.availableBalance || '...') + ' ETH, '}
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
