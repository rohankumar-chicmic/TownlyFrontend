import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Icons } from '@utils/icons';
import { Dropdown } from 'react-native-element-dropdown';
import { step1Schema } from '../validationSchemas';
import { DocumentFile, NFTFormData, Step1FormData } from '../types';

import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: NFTFormData;
  setFormData: Dispatch<SetStateAction<NFTFormData>>;
}

const propertyTypeOptions = [
  { label: 'Land', value: 'Land' },
  { label: 'Residential', value: 'Residential' },
  { label: 'Commercial', value: 'Commercial' },
];

export default function Step1(props: Readonly<StepProps>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const [pickedFile, setPickedFile] = useState<DocumentPickerResponse | null>(
    null,
  );

  const handlePickFile = async () => {
    try {
      const [pickResult] = await pick({ type: [types.pdf, types.docx] });

      const file = {
        name: pickResult.name,
        uri: pickResult.uri,
        type: pickResult.type,
        size: pickResult.size,
      };

      setPickedFile(pickResult);

      setValue('documents.0.file', file as DocumentFile, {
        shouldValidate: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleContinue = (data: Step1FormData) => {
    props.setFormData(prev => ({
      ...prev,
      ...data,
      documents: data.documents,
    }));

    props.setStep(prev => prev + 1);
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: yupResolver(step1Schema),
    mode: 'onSubmit',
    defaultValues: {
      propertyName: '',
      description: '',
      location: '',
      propertyType: '',
      documents: [
        {
          documentName: '',
          file: null,
        },
      ],
    },
  });

  useEffect(() => {
    const existingDocuments =
      props.formData.documents?.length > 0
        ? props.formData.documents
        : [{ documentName: '', file: null }];

    reset({
      propertyName: props.formData.propertyName ?? '',
      description: props.formData.description ?? '',
      location: props.formData.location ?? '',
      propertyType: props.formData.propertyType ?? '',
      documents: existingDocuments,
    });

    const existingFile = existingDocuments[0]?.file;

    if (existingFile) {
      setPickedFile({
        name: existingFile.name,
        uri: existingFile.uri,
        type: existingFile.type,
        size: existingFile.size,
      } as DocumentPickerResponse);
    } else {
      setPickedFile(null);
    }
  }, [props.formData, reset]);

  return (
    <View style={dynamicStyles.containerSurface}>
      <Text style={[dynamicStyles.heading]}>Property Details</Text>
      <Text
        style={{
          color: Colors.textSecondary,
          marginBottom: 10,
          paddingVertical: 5,
          fontSize: 12,
        }}
      >
        Let&apos;s start with the basic information about your property
      </Text>

      <Controller
        control={control}
        name="propertyName"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Property Name"
            required
            placeholder="e.g., Sunset Villa, Downtown Loft"
            hintText={(value.length ?? '0') + '/100 characters'}
            value={value}
            onChangeText={onChange}
            error={errors.propertyName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Property Description"
            required
            multiline
            hintText={(value.length ?? '0') + '/500 characters'}
            placeholder="Describe the Property"
            value={value}
            onChangeText={onChange}
            error={errors.description?.message}
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
            name="location"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Location"
                required
                placeholder="e.g., Miami, Florida"
                value={value}
                onChangeText={onChange}
                error={errors.location?.message}
              />
            )}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={dynamicStyles.label}>
            Property Type
            <Text style={{ color: Colors.primary }}> *</Text>
          </Text>
          <Controller
            control={control}
            name="propertyType"
            render={({ field: { onChange, value } }) => (
              <>
                <Dropdown
                  data={propertyTypeOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Type"
                  value={value}
                  onChange={item => onChange(item.value)}
                  style={[dynamicStyles.input]}
                  activeColor={Colors.elevated}
                  placeholderStyle={dynamicStyles.dropdownPlaceholder}
                  selectedTextStyle={dynamicStyles.dropdownSelectedText}
                  containerStyle={dynamicStyles.dropdownContainer}
                  itemTextStyle={dynamicStyles.dropdownItemText}
                />

                {errors.propertyType && (
                  <Text
                    style={{
                      color: Colors.error,
                      fontSize: 10,
                      marginLeft: 5,
                      marginTop: 2,
                    }}
                  >
                    {errors.propertyType?.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="documents.0.documentName"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Document Name"
                required
                placeholder="e.g., Property Deed"
                value={value}
                onChangeText={onChange}
                error={errors.documents?.[0]?.documentName?.message}
              />
            )}
          />
        </View>
        <View style={{ flex: 1, marginTop: 6 }}>
          <Text style={dynamicStyles.label}>
            Upload Document <Text style={{ color: Colors.primary }}> *</Text>
          </Text>
          <Button
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
          {errors.documents?.[0]?.file && (
            <Text
              style={{
                color: Colors.error,
                fontSize: 10,
                marginLeft: 5,
                marginTop: 2,
              }}
            >
              {errors.documents[0].file.message}
            </Text>
          )}
        </View>
      </View>
      <Button
        title="Continue"
        onPress={handleSubmit(handleContinue)}
        style={{ alignSelf: 'flex-end', marginTop: 20 }}
        textStyle={{ marginHorizontal: 10 }}
      >
        <Icons.Arrow
          height={15}
          width={15}
          color={Colors.background}
        ></Icons.Arrow>
      </Button>
    </View>
  );
}
