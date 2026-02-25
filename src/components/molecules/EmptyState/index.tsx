import { View, Text, Dimensions } from 'react-native';
import useTheme from '@hooks/useTheme';

export default function EmptyState({ message }: { message: string }) {
  const { Colors } = useTheme();
  return (
    <View
      style={{
        padding: 20,
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
      }}
    >
      <Text style={{ color: Colors.textMuted, fontSize: 14 }}>{message}</Text>
    </View>
  );
}
