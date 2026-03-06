import React, { useRef, useState } from 'react';
import { View, Text, Platform, Image } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';

import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import BackButton from '@components/atoms/BackButton';
import FormInput from '@components/atoms/FormInput';
import Button from '@components/atoms/Button';

import { uploadImage } from '@utils/imageUpload';
import { useSubmitKYCMutation } from '@redux/KYCApiReducer';
import { DocumentFile, KYCFormData } from './form.type';
import { kycSchema } from './validationSchema';
import styles from './styles';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import Toast from 'react-native-toast-message';

// ─── Reusable wrapper that mirrors the FormInput shell ───────────────────────
interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  hintText?: string;
  children: React.ReactNode;
}

function FieldWrapper({
  label,
  required,
  error,
  hintText,
  children,
}: Readonly<FieldWrapperProps>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  return (
    <View style={{ padding: 5, paddingBottom: 0 }}>
      <Text style={dynamicStyles.label}>
        {label} {required && <Text style={{ color: Colors.primary }}>*</Text>}
      </Text>

      {/* Caller renders the interactive element (button / image strip) here */}
      {children}

      {/* Error / hint line – identical to FormInput */}
      <Text
        style={{
          color: error ? Colors.error : Colors.textSecondary,
          fontSize: 10,
          marginLeft: 10,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {error ?? hintText}
      </Text>
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────
export default function KYCVerificationScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [pickedFile, setPickedFile] = useState<DocumentPickerResponse | null>(
    null,
  );

  const navigation = useAppNavigation();
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [submitKYC, { isLoading }] = useSubmitKYCMutation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<KYCFormData>({
    resolver: yupResolver(kycSchema) as Resolver<KYCFormData>,
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      fullAddress: '',
      documentType: '',
      document: null,
      selfieUrl: '',
    },
  });

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return iso.split('T')[0];
  };

  const handleContinue = async (data: KYCFormData) => {
    if (!data.document || !data.selfieUrl) {
      console.warn('Missing document or selfie');
      return;
    }

    try {
      const formData = new FormData();

      formData.append('FullName', data.fullName);
      formData.append('DateOfBirth', new Date(data.dateOfBirth).toISOString());
      formData.append('FullAddress', data.fullAddress);
      formData.append('DocumentType', data.documentType);

      formData.append('DocumentFile', {
        uri:
          Platform.OS === 'ios'
            ? data.document.uri.replace('file://', '')
            : data.document.uri,
        name: data.document.name,
        type: data.document.type,
      } as any);

      formData.append('SelfieFile', {
        uri:
          Platform.OS === 'ios'
            ? data.selfieUrl.replace('file://', '')
            : data.selfieUrl,
        name: 'selfie.jpg',
        type: 'image/jpeg',
      } as any);

      await submitKYC(formData).unwrap();

      navigation.navigate(ROUTES.TABS);

      Toast.show({
        type: 'success',
        text1: 'Kyc is submitted successfully',
      });
    } catch (error: any) {
      console.error('KYC submission failed:', error);
      Toast.show({
        type: 'error',
        text1: JSON.stringify(error) + 'Some Error occured',
      });
    }
  };

  const handleSelfiePick = async () => {
    const result = await uploadImage('selfie');
    if (result) {
      setValue('selfieUrl', result.trim(), { shouldValidate: true });
      setSelfieUploaded(true);
    }
  };

  const handlePickFile = async () => {
    try {
      const [result] = await pick({ type: [types.images, types.pdf] });

      const file = {
        name: result.name,
        uri: result.uri,
        type: result.type,
        size: result.size,
      };

      setPickedFile(result);
      setValue('document', file as DocumentFile, { shouldValidate: true });
    } catch (err) {
      console.log('File picking cancelled or failed:', err);
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll
          enableOnAndroid
          extraScrollHeight={20}
          keyboardShouldPersistTaps="handled"
          style={{ backgroundColor: Colors.background }}
          contentContainerStyle={dynamicStyles.container}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <BackButton style={{ position: 'absolute', zIndex: 100 }} />
            </View>
            <Text
              style={[
                dynamicStyles.heroPrimarytext,
                {
                  alignSelf: 'center',
                  textAlign: 'center',
                  flex: 1,
                  fontSize: 25,
                },
              ]}
            >
              Verify Your Identity
            </Text>
          </View>

          <Text
            style={{
              alignSelf: 'center',
              color: Colors.textSecondary,
              fontSize: 15,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            To keep your account secure and comply with financial regulations,
            we need to verify a few details. It only takes about 2 minutes.
          </Text>

          <View style={dynamicStyles.containerSurface}>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={dynamicStyles.heading}>Your Info</Text>
              <Text
                style={{
                  color: Colors.textSecondary,
                  marginBottom: 10,
                  paddingVertical: 5,
                  fontSize: 12,
                }}
              >
                Let&apos;s start with the basic information about your identity
              </Text>
            </View>

            {/* Full Name */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Full Name"
                  required
                  value={value}
                  onChangeText={text => {
                    if (text.length <= 100) onChange(text);
                  }}
                  placeholder="Full name"
                  error={errors.fullName?.message}
                />
              )}
            />

            {/* Date of Birth */}
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { value, onChange } }) => (
                <FieldWrapper
                  label="Date of Birth"
                  required
                  error={errors.dateOfBirth?.message}
                  hintText="As per your official document"
                >
                  <Button
                    title=""
                    style={[dynamicStyles.input, { marginBottom: 0 }]}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text
                      style={{
                        color: value ? Colors.textPrimary : Colors.textMuted,
                        fontSize: 13,
                      }}
                    >
                      {value ? formatDate(value) : 'Select Date'}
                    </Text>
                  </Button>

                  {showDatePicker && (
                    <DateTimePicker
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      maximumDate={new Date()}
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          onChange(selectedDate.toISOString());
                        }
                      }}
                    />
                  )}
                </FieldWrapper>
              )}
            />

            {/* Full Address */}
            <Controller
              control={control}
              name="fullAddress"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Full Address"
                  required
                  value={value}
                  placeholder="Full address"
                  onChangeText={text => {
                    if (text.length <= 255) onChange(text);
                  }}
                  error={errors.fullAddress?.message}
                />
              )}
            />

            {/* Document Type + Upload Document (side by side) */}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ width: '46%' }}>
                <Controller
                  control={control}
                  name="documentType"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Document Type"
                      required
                      placeholder="e.g. Passport, License"
                      value={value}
                      onChangeText={text => {
                        if (text.length <= 50) onChange(text);
                      }}
                      error={errors.documentType?.message}
                    />
                  )}
                />
              </View>

              <View style={{ width: '51%' }}>
                <FieldWrapper
                  label="Upload Document"
                  required
                  error={errors.document?.message as string | undefined}
                  hintText="Allowed: jpeg, png, jpg and pdf."
                >
                  <Button
                    title=""
                    style={[dynamicStyles.input, { marginBottom: 0 }]}
                    onPress={handlePickFile}
                  >
                    <Text
                      style={{
                        color: pickedFile ? Colors.primary : Colors.textMuted,
                        fontSize: 13,
                      }}
                    >
                      {pickedFile ? pickedFile?.name : 'Select Document'}
                    </Text>
                  </Button>
                </FieldWrapper>
              </View>
            </View>

            {/* Upload Selfie */}
            <FieldWrapper
              label="Upload Selfie"
              required
              error={errors.selfieUrl?.message}
              hintText="Take a clear photo of your face"
            >
              <Button
                title=""
                style={[dynamicStyles.input, { marginBottom: 0 }]}
                onPress={handleSelfiePick}
              >
                <Text
                  style={{
                    color: selfieUploaded ? Colors.primary : Colors.textMuted,
                    fontSize: 13,
                  }}
                >
                  {selfieUploaded ? '✓ Selfie Uploaded' : 'Upload Selfie'}
                </Text>
              </Button>
            </FieldWrapper>

            {/* Selfie preview */}
            {selfieUploaded && (
              <View
                style={{
                  marginTop: 4,
                  marginLeft: 5,
                  alignSelf: 'flex-start',
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: Colors.border,
                }}
              >
                <Image
                  source={{ uri: control._formValues.selfieUrl }}
                  style={{ width: 120, height: 120 }}
                  resizeMode="cover"
                />
              </View>
            )}

            <Button
              title={isLoading ? 'Submitting...' : 'Submit'}
              onPress={handleSubmit(handleContinue)}
              disabled={isLoading}
              style={{ alignSelf: 'flex-end', marginTop: 20 }}
              textStyle={{ marginHorizontal: 10 }}
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
