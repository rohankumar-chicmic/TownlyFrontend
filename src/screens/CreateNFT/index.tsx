import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Modal } from 'react-native';
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
import useConfirmExit from '@hooks/useConfirmExit';

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
    rentalIncome: data.rentalIncomeHistory ?? 0,
    pricePerUnit: data.pricePerUnit ?? 0,
    expectedAnnualYield: data.annualYieldPercent ?? 0,
    propertyImage: imageFile,
  };
};

export default function CreateNFTScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const route = useAppRoute();

  const [step, setStep] = useState(0);
  const [isDirty, setIsDirty] = useState(false);

  // Ref to track Step4 submission loading state without causing re-renders
  const isSubmittingRef = useRef(false);

  const isEdit = route.params?.isEdit;
  const isActiveProperty = route.params?.isActiveProperty;
  const initialValues = route.params?.initialValues;

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

  const initialFormData = useMemo(() => {
    if (isEdit && initialValues) {
      return mapApiToFormData(initialValues);
    }
    return defaultFormData;
  }, [isEdit, initialValues]);

  const [formData, setFormData] = useState<NFTFormData>(initialFormData);
  const submissionCompletedRef = useRef(false);
  useEffect(() => {
    if (isEdit && initialValues) {
      setFormData(mapApiToFormData(initialValues));
    }
  }, [isEdit, initialValues]);

  const { showExitModal, confirmExit, cancelExit, setShowExitModal } =
    useConfirmExit({ hasChanges: isDirty });

  const screenTitle = isEdit ? 'Update Property' : 'Create Property';

  const subtitleText = isEdit
    ? 'Modify your tokenized property details on OneChain'
    : 'Tokenize your real estate asset and enable fractional ownership on OneChain';

  const exitTitle = isEdit ? 'Discard Changes?' : 'Discard Progress?';

  const exitMessage = isEdit
    ? 'If you leave now, your changes will not be saved.'
    : 'If you leave now, all the information you entered will be permanently lost.';

  const handleGoBack = () => {
    // Block back navigation entirely while Step4 is submitting
    if (isSubmittingRef.current) return;

    if (submissionCompletedRef.current) {
      navigation.goBack();
      return;
    }

    if (!isDirty) {
      setTimeout(() => {
        navigation.goBack();
      }, 100);
      return;
    }

    setShowExitModal(true);
  };

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
              setIsDirty={setIsDirty}
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
              onLoadingChange={(loading, completed) => {
                isSubmittingRef.current = loading;

                if (completed) {
                  submissionCompletedRef.current = true;
                  setIsDirty(false);
                  setTimeout(() => navigation.goBack(), 100);
                }
              }}
            />
          )}
        </View>
      </KeyboardAwareScrollView>

      {/* Exit Confirmation Modal */}
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
                title="No"
                variant="outline"
                onPress={cancelExit}
                textStyle={{ color: Colors.primary }}
              />

              <Button title="Yes" onPress={confirmExit} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
