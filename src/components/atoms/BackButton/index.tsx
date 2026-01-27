import React from 'react';
import { Pressable, ViewStyle, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';
interface BackButtonProps {
  style?: ViewStyle;
  onPress?: () => void;
  size?: number;
}

export default function BackButton({
  style,
  onPress,
  size = 24,
}: Readonly<BackButtonProps>) {
  const navigation = useNavigation();
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={10}
      style={[dynamicStyles.box, style]}
    >
      <Text style={dynamicStyles.symbol}>
        {' < Back'}
      </Text>
    </Pressable>
  );
}
