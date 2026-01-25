// components/ConnectButton.tsx
import useTheme from '@hooks/useTheme';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import { useState } from 'react';
import { View, Text, Pressable, ViewStyle } from 'react-native';


interface ConnectButtonPropsType {
  style?: ViewStyle;
}

function ConnectButton(props: ConnectButtonPropsType) {
  const {Colors} = useTheme();
  const { open, disconnect } = useAppKit();
  const [connected, setConnected] = useState(false);
  const { address, isConnected, chainId } = useAccount();

  const handleDisconnect = () =>{
    setConnected(false);
    disconnect();
  }

  if (connected) {
    console.log(address);
    console.log(chainId);
    return (
      <View >
        <Pressable onPress={handleDisconnect} style={props.style}>
          <Text style={{color:Colors.textSecondary}}>{address}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable style={props.style} onPress={() => {
      open();
      setConnected(true);
      }}>
      <Text style={{color:Colors.textSecondary}}>Connect Wallet</Text>
    </Pressable>
  );
}

export default ConnectButton;
