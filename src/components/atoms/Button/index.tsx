import React from 'react';
import {
  Text,
  ActivityIndicator,
  Pressable,
  View,
  ViewStyle,
} from 'react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';

type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  loading = false,
  variant = 'primary',
  size = 'md',
  style,
  children,
  leftIcon,
  rightIcon,
  disabled,
}: Readonly<ButtonProps>) {
  const { dynamicStyles, Colors } = useStyles(styles);

  return (
    <Pressable
      onPress={onPress}
      disabled={loading || disabled}
      style={[
        dynamicStyles.base,
        dynamicStyles[variant],
        dynamicStyles[size],
        disabled && dynamicStyles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? Colors.primary : '#000'}
        />
      ) : (
        <View style={dynamicStyles.content}>
          {leftIcon && <View style={dynamicStyles.icon}>{leftIcon}</View>}

          {title && (
            <Text style={dynamicStyles.text}>{title}</Text>
          )}

          {children}

          {rightIcon && (
            <View style={dynamicStyles.icon}>{rightIcon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
}
