import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import styles from './styles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormInput from '@components/atoms/FormInput';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import { uploadImage } from '@utils/imageUpload';
import { useSubmitKYCMutation } from '@redux/KYCApiReducer';

import { Icons } from '@utils/icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { KYCFormData } from './form.type';
import { kycSchema } from './validationSchema';
import Button from '@components/atoms/Button';

export default function KYCVerificationScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [pickedFile, setPickedFile] = useState<DocumentPickerResponse | null>(
    null,
  );
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [submitKYC, { isLoading }] = useSubmitKYCMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<KYCFormData>({
    resolver: yupResolver(kycSchema),
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      fullAddress: '',
      documentType: '',
      document: null,
      selfieUrl: '',
    },
  });

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
    } catch (error) {
      console.error('KYC submission failed:', error);
    }
  };

  const handleSelfiePick = async () => {
    const result = await uploadImage('selfie');

    if (result) {
      setValue('selfieUrl', result, { shouldValidate: true });
      setSelfieUploaded(true);
    }
  };

  const handlePickFile = async () => {
    const [result] = await pick({ type: [types.pdf, types.docx] });

    const file = {
      name: result.name,
      uri: result.uri,
      type: result.type,
      size: result.size,
    };

    setPickedFile(result);
    setValue('document', file, { shouldValidate: true });
  };

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
            Verify Your Identity
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
            To keep your account secure and comply with financial regulations,
            we need to verify a few details. It only takes about 2 minutes.
          </Text>
          <View style={dynamicStyles.containerSurface}>
            <Text style={[dynamicStyles.heading]}>Your Info</Text>
            <Text
              style={{
                color: Colors.textSecondary,
                marginBottom: 10,
                paddingVertical: 5,
                fontSize: 12,
              }}
            >
              Let's start with the basic information about your identity
            </Text>

            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Full Name"
                  required
                  value={value}
                  onChangeText={onChange}
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Date of Birth"
                  required
                  placeholder="YYYY-MM-DD"
                  value={value}
                  onChangeText={onChange}
                  error={errors.dateOfBirth?.message}
                />
              )}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="fullAddress"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Full Address"
                      required
                      value={value}
                      onChangeText={onChange}
                      error={errors.fullAddress?.message}
                    />
                  )}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  name="documentType"
                  render={({ field: { onChange, value } }) => (
                    <FormInput
                      label="Document Type"
                      required
                      placeholder="e.g. Passport, Driver's License"
                      value={value}
                      onChangeText={onChange}
                      error={errors.documentType?.message}
                    />
                  )}
                />
              </View>
              <View style={{ flex: 1, marginTop: 6 }}>
                <Text style={dynamicStyles.label}>
                  Upload Document{' '}
                  <Text style={{ color: Colors.primary }}> *</Text>
                </Text>
                <Button
                  title=""
                  style={[
                    dynamicStyles.input,
                    { marginBottom: 2 },
                    errors.document && { borderColor: Colors.error },
                  ]}
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
                {errors.document && (
                  <Text
                    style={{
                      color: Colors.error,
                      fontSize: 10,
                      marginLeft: 5,
                      marginTop: 2,
                    }}
                  >
                    {errors.document.message}
                  </Text>
                )}
                <Text
                  style={{
                    color: Colors.textSecondary,
                    fontSize: 10,
                    marginLeft: 5,
                    marginTop: 4,
                  }}
                >
                  Recommended: PDF, Doc
                </Text>
              </View>
            </View>

            <View style={{ flex: 1, marginTop: 6 }}>
              <Text style={dynamicStyles.label}>
                Upload Selfie
                <Text style={{ color: Colors.primary }}> *</Text>
              </Text>
              <Button
                title=""
                style={[
                  dynamicStyles.input,
                  { marginBottom: 2 },
                  errors.selfieUrl && { borderColor: Colors.error },
                ]}
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
              {errors.selfieUrl && (
                <Text
                  style={{
                    color: Colors.error,
                    fontSize: 10,
                    marginLeft: 5,
                    marginTop: 2,
                  }}
                >
                  {errors.selfieUrl.message}
                </Text>
              )}
              <Text
                style={{
                  color: Colors.textSecondary,
                  fontSize: 10,
                  marginLeft: 5,
                  marginTop: 4,
                }}
              >
                Take a clear photo of your face
              </Text>
            </View>

            <Button
              title={isLoading ? 'Submitting...' : 'Continue'}
              onPress={handleSubmit(handleContinue)}
              disabled={isLoading}
              style={{ alignSelf: 'flex-end', marginTop: 20 }}
              textStyle={{ marginHorizontal: 10 }}
            >
              {!isLoading && <Icons.Arrow height={15} width={15} />}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}