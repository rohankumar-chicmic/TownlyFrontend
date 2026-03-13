import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Modal, BackHandler } from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
import Step4 from './Steps/Step4';
import StepIndicator from './Steps/StepIndicator';
import { useAppRoute } from '@hooks/useAppRoute';

import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';
import { Icons } from '@utils/icons';
import { NFTFormData, DocumentFile } from './types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAppNavigation } from '@hooks/useNavigation';
import Button from '@components/atoms/Button';
import { useFocusEffect } from '@react-navigation/native';

const mapApiToFormData = (data: any): NFTFormData => {
  const imageFile: DocumentFile | null = data.imageUrl
    ? {
        uri: data.imageUrl,
        name: data.imageUrl.split('/').pop() ?? 'property-image.jpg',
        type: 'image/jpeg',
      }
    : null;

  return {
    propertyName: data.name ?? '',
    description: data.description ?? '',
    location: data.location ?? '',
    propertyType: data.propertyType ?? '',
    documents: data.documents ?? [],
    totalPropertyValue: data.totalValue ?? 0,
    numberOfShares: data.totalUnits ?? 0,
    rentalIncome: data.rentalIncomeHistory,
    pricePerUnit: data.pricePerUnit ?? 0,
    expectedAnnualYield: data.annualYieldPercent ?? 0,
    propertyImage: imageFile,
  };
};

const defaultFormData: NFTFormData = {
  propertyName: '',
  description: '',
  location: '',
  propertyType: '',
  documents: [],
  totalPropertyValue: 0,
  numberOfShares: 0,
  rentalIncome: 0,
  pricePerUnit: 0,
  expectedAnnualYield: 0,
  propertyImage: null,
};

const isFormDirty = (current: NFTFormData): boolean => {
  return (
    !!current.propertyName ||
    !!current.description ||
    !!current.location ||
    !!current.propertyType ||
    (current.documents?.length ?? 0) > 0 ||
    !!current.propertyImage ||
    current.totalPropertyValue !== 0 ||
    current.numberOfShares !== 0 ||
    !!current.rentalIncome ||
    current.pricePerUnit !== 0 ||
    current.expectedAnnualYield !== 0
  );
};

export default function CreateNFTScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [step, setStep] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const navigation = useAppNavigation();

  const route = useAppRoute();
  const isEdit = route.params?.isEdit;
  const isActiveProperty = route.params?.isActiveProperty;
  const initialValues = route.params?.initialValues;

  const [formData, setFormData] = useState<NFTFormData>(
    isEdit && initialValues ? initialValues : defaultFormData,
  );

  const screenTitle = isEdit ? 'Update Property' : 'Create Property';

  const subtitleText = isEdit
    ? 'Modify your tokenized property details on OneChain'
    : 'Tokenize your real estate asset and enable fractional ownership on OneChain';

  const exitTitle = isEdit ? 'Discard Changes?' : 'Discard Progress?';

  const exitMessage = isEdit
    ? 'If you leave now, your changes will not be saved.'
    : 'If you leave now, all the information you entered will be permanently lost.';

  const isDirty = isFormDirty(formData);

  // Show discard modal or navigate back, depending on dirty state
  const maybeShowExitModal = useCallback(() => {
    if (isDirty) {
      setShowExitModal(true);
    } else {
      navigation.goBack();
    }
  }, [isDirty, navigation]);

  // Hardware back button — on step > 0 it does nothing (step's own Back button
  // handles that); on step 0 it shows the discard modal if dirty.
  useFocusEffect(
    useCallback(() => {
      const onHardwareBack = () => {
        if (step > 0) {
          // Let the in-step Back button handle it; suppress default behaviour
          // so the user isn't accidentally popped out of the screen mid-flow.
          setStep(prev => prev - 1);
        } else {
          maybeShowExitModal();
        }
        return true; // always intercept
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onHardwareBack,
      );
      return () => subscription.remove();
    }, [step, maybeShowExitModal]),
  );

  // Top-level BackButton — always triggers discard-check (never step-back)
  const handleGoBack = () => {
    maybeShowExitModal();
  };

  const confirmExit = () => {
    setShowExitModal(false);
    navigation.goBack();
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  useEffect(() => {
    if (isEdit && initialValues) {
      const mappedData = mapApiToFormData(initialValues);
      setFormData(mappedData);
    }
  }, [isEdit, initialValues]);

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={dynamicStyles.scrollView}
        contentContainerStyle={dynamicStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[dynamicStyles.container, dynamicStyles.flexGrow]}>
          {/* Header */}
          <View style={dynamicStyles.headerContainer}>
            <View style={dynamicStyles.backButtonWrapper}>
              <BackButton onPress={handleGoBack} />
            </View>
            <Text style={dynamicStyles.headerTitle}>{screenTitle}</Text>
          </View>

          <Text style={dynamicStyles.subtitle}>{subtitleText}</Text>

          {/* Step Indicator */}
          <View style={dynamicStyles.stepContainer}>
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
              formData={formData}
              setFormData={setFormData}
              isActiveProperty={isActiveProperty}
            />
          )}
          {step === 1 && (
            <Step2
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
              isActiveProperty={isActiveProperty}
            />
          )}
          {step === 2 && (
            <Step3
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
              isActiveProperty={isActiveProperty}
            />
          )}
          {step === 3 && (
            <Step4
              setStep={setStep}
              formData={formData}
              isEdit={isEdit}
              isActiveProperty={isActiveProperty}
              propertyId={route.params?.initialValues?.id}
            />
          )}
        </View>
      </KeyboardAwareScrollView>

      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={cancelExit}
      >
        <View style={dynamicStyles.centerOverlay}>
          <View style={dynamicStyles.centerModal}>
            <Text style={dynamicStyles.centerTitle}>{exitTitle}</Text>

            <Text style={dynamicStyles.centerText}>{exitMessage}</Text>

            <View style={dynamicStyles.modalButtonRow}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={cancelExit}
                textStyle={{ color: Colors.primary }}
              />

              <Button title="Discard" onPress={confirmExit} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}