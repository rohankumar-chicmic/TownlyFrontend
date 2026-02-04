import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { Icons } from '@utils/icons';
import { NFTFormData } from '../types';

interface stepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: NFTFormData;
}

export default function Step4(props: stepProps) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={dynamicStyles.containerSurface}>
      <Text style={[dynamicStyles.heading]}>Financial Information</Text>
      <Text
        style={{
          color: Colors.textSecondary,
          marginBottom: 10,
          paddingVertical: 5,
          fontSize: 12,
        }}
      >
        Configure the tokenization and investment parameters
      </Text>

      <FormInput
        label="Total Property Value (USD)"
        required
        placeholder="e.g., Sunset Villa, Downtown Loft"
      ></FormInput>
      <FormInput
        label="Property Description "
        required
        placeholder="Decribe the Property"
      ></FormInput>
      <FormInput
        label="Location"
        required
        placeholder="e.g., Miami, Florida"
      ></FormInput>
      <FormInput
        label="Document Name "
        required
        placeholder="e.g., Property Deed, Tax Records"
      ></FormInput>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Back"
          onPress={() => props.setStep(prev => prev - 1)}
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          textStyle={{ marginHorizontal: 10, color: Colors.primaryDark }}
          variant="outline"
        ></Button>

        <Button
          title="Submit"
          onPress={() => console.log('implementation pending')}
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          textStyle={{ marginHorizontal: 10 }}
        >
          <Icons.Arrow height={15} width={15}></Icons.Arrow>
        </Button>
      </View>
    </View>
  );
}
