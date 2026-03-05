import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import useStyles from '@hooks/useStyles';

interface EditButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  size?: number;
}

export default function EditButton({
  style,
  onPress,
  size = 20,
}: Readonly<EditButtonProps>) {
  const { dynamicStyles, darkMode, Colors } = useStyles(styles);

  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={[dynamicStyles.box, style]}
    >
      <Feather
        name="edit-3"
        size={size}
        color={darkMode ? Colors.primary : Colors.textPrimary}
      />
    </Pressable>
  );
}
