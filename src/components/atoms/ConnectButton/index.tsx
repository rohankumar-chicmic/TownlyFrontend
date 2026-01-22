// components/ConnectButton.tsx
import { useAppKit, useAccount } from '@reown/appkit-react-native'
import { View, Text, Pressable } from 'react-native'

function ConnectButton() {
  const { open, disconnect } = useAppKit()
  const { address, isConnected, chainId } = useAccount()

  if (isConnected) {
    return (
      <View>
        <Text>Connected to: {chainId}</Text>
        <Text>Address: {address}</Text>
        <Pressable onPress={() => disconnect()}><Text>Disconnect</Text></Pressable>
      </View>
    )
  }

  return <Pressable onPress={() => open()}><Text>Connect Wallet</Text></Pressable>
}

export default ConnectButton