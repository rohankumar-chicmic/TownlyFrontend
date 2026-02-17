import React, { useState } from 'react';
import { View, Text, Platform, Image } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller, useForm } from 'react-hook-form';


import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import BackButton from '@components/atoms/BackButton';
import FormInput from '@components/atoms/FormInput';
import Button from '@components/atoms/Button';

import styles from './styles';

export default function KYCVerificationScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

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
                  placeholder="Full name"
                  error={errors.fullName?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { value, onChange } }) => (
                <View style={{ flex: 1, marginTop: 6 }}>
                  <Text style={dynamicStyles.label}>
                    Date of Birth
                    <Text style={{ color: Colors.primary }}> *</Text>
                  </Text>

                  <Button
                    title=""
                    style={[dynamicStyles.input, { marginBottom: 2 }]}
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

                  {errors.dateOfBirth && (
                    <Text
                      style={{
                        color: Colors.error,
                        fontSize: 10,
                        marginLeft: 5,
                        marginTop: 2,
                      }}
                    >
                      {errors.dateOfBirth.message}
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
                    As per your official document
                  </Text>

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
                </View>
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
                      placeholder="Full address"
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
                      placeholder="e.g. Passport, License"
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
                  style={[dynamicStyles.input, { marginBottom: 2 }]}
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
                style={[dynamicStyles.input, { marginBottom: 2 }]}
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

            {selfieUploaded && (
              <View
                style={{
                  marginTop: 10,
                  alignSelf: 'flex-start',
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: Colors.border,
                }}
              >
                <Image
                  source={{ uri: control._formValues.selfieUrl }}
                  style={{
                    width: 120,
                    height: 120,
                  }}
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
            ></Button>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
