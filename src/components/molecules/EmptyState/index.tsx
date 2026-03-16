import { View, Text, Dimensions } from 'react-native';
import useTheme from '@hooks/useTheme';

export default function EmptyState({ message }: { message: string }) {
  const { Colors } = useTheme();
  return (
    <View
      style={{
        padding: 20,
        alignItems: 'center',
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
      }}
    >
      <Text
        style={{ color: Colors.textMuted, fontSize: 14, textAlign: 'center' }}
      >
        {message}
      </Text>
    </View>
  );
}
