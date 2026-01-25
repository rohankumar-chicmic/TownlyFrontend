import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useTheme from '@hooks/useTheme';

const steps = ['Property Details', 'Financial Info', 'Upload Image', 'Review'];

export default function StepIndicator({ currentStep = 0 }) {
  const { Colors } = useTheme();

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const active = index === currentStep;

        return (
          <View key={step} style={styles.step}>
            <View
              style={[
                styles.circle,
                
              ]}
            />
            <Text
              style={[
                styles.label,
                { color: active ? Colors.primary : Colors.textSecondary },
              ]}
            >
              Step {index + 1}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  step: {
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
  },
});
