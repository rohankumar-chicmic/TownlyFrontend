import React from 'react';
import {
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';

type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  disabled?: boolean;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  children,
  disabled = false,
  textStyle,
}: Readonly<ButtonProps>) {
  const { dynamicStyles } = useStyles(styles);

  const pressedStyleMap: Record<ButtonVariant, ViewStyle> = {
    primary: dynamicStyles.pressedPrimary,
    secondary: dynamicStyles.pressedSecondary,
    outline: dynamicStyles.pressedOutline,
    ghost: dynamicStyles.pressedGhost,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        dynamicStyles.base,
        dynamicStyles[size],
        dynamicStyles[variant],
        disabled && dynamicStyles.disabled,
        pressed && !disabled && pressedStyleMap[variant],
        style,
      ]}
    >
      {title && (
        <Text style={[dynamicStyles.text, textStyle]}>
          {title}
        </Text>
      )}
      {children}
    </Pressable>
  );
}
