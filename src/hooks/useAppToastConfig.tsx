import React from 'react';
import { BaseToast, ErrorToast, ToastConfig } from 'react-native-toast-message';
import useTheme from '@hooks/useTheme'; // Using your existing hook

export const useAppToastConfig = () => {
  const { Colors } = useTheme();

  const config: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: Colors.success,
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.border,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: Colors.textPrimary,
        }}
        text2Style={{
          fontSize: 14,
          color: Colors.textSecondary,
        }}
      />
    ),

    error: props => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: Colors.error,
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.border,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: Colors.textPrimary,
        }}
        text2Style={{
          fontSize: 14,
          color: Colors.textSecondary,
        }}
      />
    ),

    info: props => (
      <BaseToast
        {...props}
        style={{
          width: '90%',
          borderLeftColor: Colors.primary, // Using your Vibrant Lime
          backgroundColor: Colors.elevated, // Using elevated for info
          borderColor: Colors.border,
          borderWidth: 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10,
        }}
        text1Style={{
          color: Colors.textPrimary,
          fontSize: 16,
          fontWeight: 'bold',
        }}
        text2Style={{
          color: Colors.textSecondary,
          fontSize: 13,
        }}
      />
    ),
  };

  return config;
};
