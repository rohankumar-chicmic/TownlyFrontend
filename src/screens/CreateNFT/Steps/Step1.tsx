import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, Keyboard } from 'react-native';
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
import Toast from 'react-native-toast-message';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: NFTFormData;
  setFormData: Dispatch<SetStateAction<NFTFormData>>;
  isActiveProperty?: boolean;
  setIsDirty?: Dispatch<SetStateAction<boolean>>;
}

const propertyTypeOptions = [
  { label: 'Land', value: 'Land' },
  { label: 'Residential', value: 'Residential' },
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Industrial', value: 'Industrial' },
];

export default function Step1(props: Readonly<StepProps>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  const [pickedFile, setPickedFile] = useState<DocumentPickerResponse | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
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

  /**
   * DOCUMENT PICKER
   */
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

      props.setIsDirty?.(true);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: '' + err,
      });

      console.log(err);
    }
  };

  /**
   * CONTINUE STEP
   */
  const handleContinue = (data: Step1FormData) => {
    props.setFormData(prev => ({
      ...prev,
      ...data,
      documents: data.documents,
    }));

    props.setStep(prev => prev + 1);
  };

  /**
   * LOAD EXISTING DATA (EDIT MODE)
   */
  useEffect(() => {
    let existingDocuments = [{ documentName: '', file: null }];

    if (props.formData.documents?.length) {
      existingDocuments = props.formData.documents.map((doc: any) =>
        doc.documentUrl ? mapApiDocumentToForm(doc) : doc,
      );
    }

    reset({
      propertyName: props.formData.propertyName ?? '',
      description: props.formData.description ?? '',
      location: props.formData.location ?? '',
      propertyType: props.formData.propertyType ?? '',
      documents: existingDocuments,
    });

    const existingFile = existingDocuments?.[0]?.file;

    if (existingFile) {
      setPickedFile(existingFile as DocumentPickerResponse);
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
          marginHorizontal: 8,
          marginBottom: 10,
          paddingVertical: 5,
          fontSize: 12,
        }}
      >
        Let&apos;s start with the basic information about your property
      </Text>

      {/* PROPERTY NAME */}
      <Controller
        control={control}
        name="propertyName"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Property Name"
            required
            readOnly={props.isActiveProperty}
            placeholder="e.g., Sunset Villa, Downtown Loft"
            hintText={`${value.length}/100 characters`}
            value={value}
            onChangeText={text => {
              onChange(text);
              props.setIsDirty?.(true);
            }}
            error={errors.propertyName?.message}
          />
        )}
      />

      {/* DESCRIPTION */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Property Description"
            required
            multiline
            maxLength={500}
            placeholder="Describe the Property"
            value={value}
            onChangeText={text => {
              onChange(text);
              props.setIsDirty?.(true);
            }}
            hintText={`${value?.length ?? 0}/500 characters`}
            error={errors.description?.message}
            scrollEnabled={true}
          />
        )}
      />

      {/* LOCATION + TYPE */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Location"
                required
                readOnly={props.isActiveProperty}
                placeholder="e.g., Miami, Florida"
                value={value}
                hintText={`${value.length}/100 characters`}
                onChangeText={text => {
                  onChange(text);
                  props.setIsDirty?.(true);
                }}
                error={errors.location?.message}
              />
            )}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={dynamicStyles.label}>
            Property Type <Text style={{ color: Colors.primary }}> *</Text>
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
                  dropdownPosition="bottom"
                  value={value}
                  disable={props.isActiveProperty}
                  onFocus={() => Keyboard.dismiss()}
                  onChange={item => {
                    onChange(item.value);
                    props.setIsDirty?.(true);
                  }}
                  style={[dynamicStyles.input, { height: 30 }]}
                  activeColor={Colors.elevated}
                  placeholderStyle={dynamicStyles.dropdownPlaceholder}
                  selectedTextStyle={dynamicStyles.dropdownSelectedText}
                  containerStyle={dynamicStyles.dropdownContainer}
                  itemTextStyle={dynamicStyles.dropdownItemText}
                />

                <Text
                  style={{
                    color: Colors.error,
                    fontSize: 10,
                    marginLeft: 10,
                    marginTop: 2,
                  }}
                >
                  {errors.propertyType?.message}
                </Text>
              </>
            )}
          />
        </View>
      </View>

      {/* DOCUMENT */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="documents.0.documentName"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Document Name"
                required
                placeholder={'e.g., Property Deed'}
                readOnly={props.isActiveProperty}
                hintText={`${value.length}/50 characters`}
                value={value}
                maxLength={30}
                onChangeText={text => {
                  onChange(text);
                  props.setIsDirty?.(true);
                }}
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
            disabled={props.isActiveProperty}
            style={[dynamicStyles.input, { marginTop: 2 }]}
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

          <Text
            style={{
              color: Colors.error,
              fontSize: 10,
              marginLeft: 10,
              marginTop: 2,
            }}
          >
            {errors.documents?.[0]?.file?.message}
          </Text>
        </View>
      </View>

      {/* CONTINUE */}
      <Button
        title="Continue"
        onPress={handleSubmit(handleContinue)}
        style={{ alignSelf: 'flex-end', margin: 8 }}
        textStyle={{ marginHorizontal: 10 }}
      >
        <Icons.Arrow height={15} width={15} color={Colors.background} />
      </Button>
    </View>
  );
}

const mapApiDocumentToForm = (doc: any) => ({
  documentName: doc.title ?? '',
  file: {
    name: doc.fileName,
    uri: doc.documentUrl,
    type: 'application/octet-stream',
    size: 0,
  },
});
