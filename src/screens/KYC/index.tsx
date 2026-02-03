import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useAppNavigation } from '@hooks/useNavigation';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { useSubmitKYCMutation } from '@redux/KYCApiReducer';
import { uploadImage } from '@utils/imageUpload';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

export default function KYC() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const navigation = useAppNavigation();

  const [submitKYC, { isLoading: isSubmitting }] = useSubmitKYCMutation();

  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    fullAddress: '',
    documentType: '',
    documentUrl: '',
    selfieUrl: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = async () => {
    const url = await uploadImage('document');
    if (url) setFormData(prev => ({ ...prev, documentUrl: url }));
  };

  const handleSelfieUpload = async () => {
    const url = await uploadImage('selfie');
    if (url) setFormData(prev => ({ ...prev, selfieUrl: url }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim())
      return Alert.alert('Validation Error', 'Please enter your full name');
    if (!formData.dateOfBirth.trim())
      return Alert.alert('Validation Error', 'Please enter your date of birth');
    if (!formData.fullAddress.trim())
      return Alert.alert('Validation Error', 'Please enter your full address');
    if (!formData.documentType.trim())
      return Alert.alert('Validation Error', 'Please enter your document type');
    if (!formData.documentUrl)
      return Alert.alert('Validation Error', 'Please upload your document');
    if (!formData.selfieUrl)
      return Alert.alert('Validation Error', 'Please upload your selfie');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await submitKYC({
        FullName: formData.fullName,
        DateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        FullAddress: formData.fullAddress,
        DocumentType: formData.documentType,
        DocumentUrl: formData.documentUrl,
        SelfieUrl: formData.selfieUrl,
      }).unwrap();

      Alert.alert(
        'Success',
        response.message ||
          'Your KYC submission has been received and is under review',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.data?.message || 'Failed to submit KYC. Please try again.',
      );
      console.error('KYC submission error:', error);
    }
  };

  return (
    <SafeAreaView style={dynamicStyles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={dynamicStyles.heroPrimarytext}>KYC Verification</Text>
          <Text style={dynamicStyles.heroText}>
            Complete your Know Your Customer verification to access all features
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <FormInput
            label="Full Name"
            required
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={value => handleInputChange('fullName', value)}
            style={dynamicStyles.input}
            labelStyle={dynamicStyles.label}
          />

          <FormInput
            label="Date of Birth"
            required
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChangeText={value => handleInputChange('dateOfBirth', value)}
            style={dynamicStyles.input}
            labelStyle={dynamicStyles.label}
          />

          <FormInput
            label="Full Address"
            required
            placeholder="Enter your full address"
            value={formData.fullAddress}
            onChangeText={value => handleInputChange('fullAddress', value)}
            style={[dynamicStyles.input, { height: 80 }]}
            labelStyle={dynamicStyles.label}
            multiline
          />

          <FormInput
            label="Document Type"
            required
            placeholder="Enter your document type (e.g., Passport)"
            value={formData.documentType}
            onChangeText={value => handleInputChange('documentType', value)}
            style={dynamicStyles.input}
            labelStyle={dynamicStyles.label}
          />

          <View style={{ marginVertical: 10 }}>
            <FormInput
              label="Document Upload"
              placeholder="Upload your document"
              value={formData.documentUrl ? 'Uploaded ✓' : ''}
              editable={false}
              style={dynamicStyles.input}
              labelStyle={dynamicStyles.label}
            />
            <TouchableOpacity
              style={dynamicStyles.containerStyle}
              onPress={handleDocumentUpload}
            >
              <Text style={{ color: Colors.textPrimary }}>
                {formData.documentUrl
                  ? 'Document Uploaded ✓'
                  : 'Upload Document'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 10 }}>
            {/* <TouchableOpacity
              style={dynamicStyles.containerStyle}
              onPress={handleSelfieUpload}
            >
              <Text style={{ color: Colors.textPrimary }}>
                {formData.selfieUrl ? 'Selfie Uploaded ✓' : 'Upload Selfie'}
              </Text>
            </TouchableOpacity> */}
            <Button
              style={[dynamicStyles.input, { marginBottom: 2 }]}
              onPress={handleSelfieUpload}
            >
              <Text
                style={{
                  color: formData.selfieUrl ? Colors.primary : Colors.textMuted,
                  fontSize: 13,
                }}
              >
                {pickedFile ? pickedFile?.name : 'Select Document'}
              </Text>
            </Button>
          </View>
        </View>

        <Button
          title={isSubmitting ? 'Submitting...' : 'Submit KYC'}
          style={{ marginTop: 20, marginBottom: 40 }}
          size="lg"
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
