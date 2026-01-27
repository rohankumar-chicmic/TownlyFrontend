// components/ConnectButton.tsx
import useTheme from '@hooks/useTheme';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import { View, Text, Pressable, ViewStyle } from 'react-native';
import Button from '../Button';

interface ConnectButtonPropsType {
  style?: ViewStyle;
}

function ConnectButton(props: ConnectButtonPropsType) {
  const { Colors } = useTheme();
  const { open, disconnect } = useAppKit();
  const { address, isConnected, chainId } = useAccount();

  if (isConnected) {
    return (
      <View>
        <Pressable onPress={() => disconnect()} style={props.style}>
          <Text style={{ color: Colors.textSecondary }}>{address}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Button
      onPress={open}
      title="Connect Wallet"
      size="sm"
      textStyle={{ fontSize: 12, fontWeight:"bold" }}
    ></Button>
  );
}

export default ConnectButton;
