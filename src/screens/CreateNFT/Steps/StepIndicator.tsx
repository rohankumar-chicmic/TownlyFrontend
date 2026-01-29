import { View, Text } from 'react-native';
import React from 'react';
import useTheme from '@hooks/useTheme';

interface indicatorProps {
  step: number;
  children?: React.ReactElement;
  text: string;
  currentStep: number;
}

export default function StepIndicator({
  step,
  text,
  children,
  currentStep,
}: indicatorProps) {
  const { Colors } = useTheme();
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          height: 50,
          width: 50,
          marginBottom: 5,
          backgroundColor:
            step == currentStep
              ? Colors.primary
              : currentStep > step
                ? Colors.primaryDark
                : Colors.surface,
          borderRadius: 15,
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        {children}
      </View>
      <Text
        style={{
          color:
            step == currentStep
              ? Colors.textPrimary
              : currentStep > step
                ? Colors.textSecondary
                : Colors.textMuted,
          fontSize: 10,
          width: 50,
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
