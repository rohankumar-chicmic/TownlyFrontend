import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Pressable } from 'react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'secondary';
}

export default function Button({ title, onPress, loading, variant = 'primary' }: ButtonProps) {
  const { dynamicStyles, Colors } = useStyles(styles);

  // Determine styles based on variant
  const buttonStyle = variant === 'outline' ? dynamicStyles.outlineButton : dynamicStyles.primaryButton;
  const textStyle = variant === 'outline' ? dynamicStyles.outlineText : dynamicStyles.primaryText;

  return (
    <Pressable 
      style={buttonStyle} 
      onPress={onPress} 
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : '#000'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
}