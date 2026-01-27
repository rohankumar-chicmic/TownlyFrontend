import React, { useState } from 'react';
import {
  Text,
  ActivityIndicator,
  Pressable,
  View,
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
  style?: ViewStyle;
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
  disabled,
  textStyle
}: Readonly<ButtonProps>) {
  const { dynamicStyles, Colors } = useStyles(styles);
  const [isPressed , setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      style={[
        dynamicStyles.base,
        dynamicStyles[variant],
        dynamicStyles[size],
        disabled && dynamicStyles.disabled,
        style,
        {backgroundColor: isPressed? Colors.primaryDark : Colors.primary}
      ]}
    >
          {title && (
            <Text style={[dynamicStyles.text, textStyle]}>{title}</Text>
          )}
          {children}
    </Pressable>
  );
}
