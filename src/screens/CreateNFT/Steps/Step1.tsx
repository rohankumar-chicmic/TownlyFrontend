import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { Icons } from '@utils/icons';
import { Dropdown } from 'react-native-element-dropdown';
import { DocumentPickerResponse, pick,   types,
 } from '@react-native-documents/picker';

interface stepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: any;
  setFormData: () => void;
}

const propertyTypeOptions = [
  { label: 'Land', value: '1' },
  { label: 'Residential', value: '2' },
  { label: 'Commercial', value: '3' },
];



export default function Step1(props: stepProps) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const [propertyType, setPropertyType] = useState('');
  const [pickedFile, setPickedFile] = useState<DocumentPickerResponse | null>(null);

  const handlePickFile = async () => {
  try {
    const [pickResult] = await pick(
      {type: [types.pdf, types.docx]}
    );
    setPickedFile(pickResult);
  } catch (err: unknown) {
    console.log(err);
  }
};

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
        Let's start with the basic information about your property
      </Text>

      <FormInput
        label="Property Name"
        required
        placeholder="e.g., Sunset Villa, Downtown Loft"
        hintText="0/100 characters"
      ></FormInput>
      <FormInput
        label="Property Description "
        required
        multiline
        hintText="0/500 characters"
        placeholder="Decribe the Property"
      ></FormInput>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1 }}>
          <FormInput
            label="Location"
            required
            placeholder="e.g., Miami, Florida"
            style={dynamicStyles.input}
          ></FormInput>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={dynamicStyles.label}>
            Property Type
            <Text style={{ color: Colors.primary }}> *</Text>
          </Text>
          <Dropdown
            data={propertyTypeOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Type"
            value={propertyTypeOptions}
            onChange={item => setPropertyType(item.value)}
            style={dynamicStyles.input}
            placeholderStyle={dynamicStyles.dropdownPlaceholder}
            selectedTextStyle={dynamicStyles.dropdownSelectedText}
            containerStyle={dynamicStyles.dropdownContainer}
            itemTextStyle={dynamicStyles.dropdownItemText}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View style={{ flex: 1 }}>
          <FormInput
            label="Document Name "
            required
            placeholder="e.g., Property Deed"
          ></FormInput>
        </View>
        <View style={{ flex: 1, marginTop: 6}}>
          <Text style={dynamicStyles.label}>
            Upload Document <Text style={{ color: Colors.primary }}> *</Text>
          </Text>
          <Button style={[dynamicStyles.input, {marginBottom: 2}]} onPress={handlePickFile}>
            <Text
              style={{
                color: pickedFile ? Colors.primary : Colors.textMuted,
                fontSize: 13,
              }}
              >
              {pickedFile? pickedFile?.name : "Select Document"}
              
            </Text>
          </Button>
          <Text
            style={{
              color: Colors.textSecondary,
              fontSize: 10,
              marginLeft: 5,
              marginBottom: 4,
            }}
          >
            Recommeded: PDF, Doc
          </Text>
        </View>
      </View>
      <Button
        title="Continue"
        onPress={() => props.setStep(prev => prev + 1)}
        style={{ alignSelf: 'flex-end', marginTop: 20 }}
        textStyle={{ marginHorizontal: 10 }}
      >
        <Icons.Arrow height={15} width={15}></Icons.Arrow>
      </Button>
    </View>
  );
}
