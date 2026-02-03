import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import StepIndicator from './Steps/StepIndicator';

import styles from './styles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icons } from '@utils/icons';

export default function CreateNFTScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [step, setStep] = useState(0);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Colors.background }}
          contentContainerStyle={dynamicStyles.container}
        >
          <BackButton />
          <Text
            style={[dynamicStyles.heroPrimarytext, { alignSelf: 'center' }]}
          >
            Create Property NFT
          </Text>
          <Text
            style={[
              {
                alignSelf: 'center',
                color: Colors.textSecondary,
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 20,
              },
            ]}
          >
            Tokenize your real estate asset and enable fractional ownership on
            OneChain
          </Text>
          <View
            style={{
              padding: 15,
              borderRadius: 15,
              backgroundColor: Colors.elevated,
              borderColor: Colors.border,
              marginBottom: 15,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <StepIndicator step={0} currentStep={step} text="Property details">
              <Icons.Step1Icon
                height={20}
                width={20}
                borderColor={
                  step < 0 ? Colors.textSecondary : Colors.background
                }
              />
            </StepIndicator>
            <StepIndicator step={1} currentStep={step} text="Financial info">
              <Icons.Step2Icon
                height={20}
                width={20}
                borderColor={
                  step < 1 ? Colors.textSecondary : Colors.background
                }
              />
            </StepIndicator>
            <StepIndicator step={2} currentStep={step} text="Upload Image">
              <Icons.Step3Icon
                height={20}
                width={20}
                borderColor={
                  step < 2 ? Colors.textSecondary : Colors.background
                }
              />
            </StepIndicator>
            <StepIndicator step={3} currentStep={step} text="Review">
              <Icons.Step4Icon
                height={20}
                width={20}
                borderColor={
                  step < 3 ? Colors.textSecondary : Colors.background
                }
              />
            </StepIndicator>
          </View>

          {step === 0 && (
            <Step1
              setStep={setStep}
              formData={{}}
              setFormData={() => console.log('nothing')}
            />
          )}
          {step === 1 && (
            <Step2
              setStep={setStep}
              formData={{}}
              setFormData={() => console.log('nothing')}
            />
          )}
          {step === 2 && (
            <Step3
              setStep={setStep}
              formData={{}}
              setFormData={() => console.log('nothing')}
            />
          )}
          {step === 3 && (
            <Step4
              setStep={setStep}
              formData={{}}
              setFormData={() => console.log('nothing')}
            />
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
