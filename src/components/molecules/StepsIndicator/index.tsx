import React from 'react';
import { View, Text} from 'react-native';
import styles from './styles';

type Step = {
  label: string;
};

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // zero-based
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={step.label}>
            <View style={styles.stepWrapper}>
              <View
                style={[
                  styles.dot,
                  isActive && styles.activeDot,
                  isCompleted && styles.completedDot,
                ]}
              />

              <Text
                style={[
                  styles.stepLabel,
                  isActive && styles.activeLabel,
                ]}
              >
                Step {index + 1}
              </Text>

              <Text style={styles.subLabel}>{step.label}</Text>
            </View>

            {index !== steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  isCompleted && styles.completedLine,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
