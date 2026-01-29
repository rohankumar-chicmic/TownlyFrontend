import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { Icons } from '@utils/icons';

interface stepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: any;
  setFormData: () => void;
}

export default function Step2(props: stepProps) {
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

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <FormInput
            label="Total Property Value (USD)"
            required
            placeholder="$ 0.0"
            hintText="Minimum Value: $1000"
          ></FormInput>
        </View>
        <View style={{ flex: 1 }}>
          <FormInput
            label="Total Number of Shares"
            required
            placeholder="0"
            hintText="Minimum: 100 Shares"
          ></FormInput>
        </View>
      </View>

      <View
        style={{
          backgroundColor: Colors.primary,
          padding: 15,
          borderRadius: 10,
          margin: 5,
        }}
      >
        <Text
          style={{ color: Colors.background, fontSize: 15, fontWeight: '600' }}
        >
          Auto-Calculated
        </Text>
        <Text style={{color: Colors.background, fontWeight: '500'}}>Price Per Share</Text>
      </View>

      <FormInput
        label="Rental Income History (per month)"
        required
        placeholder="0"
        hintText="Optional: Estimated annual rental return percentage"
      ></FormInput>

      <FormInput
        label="Expected Annual Yield (%)"
        required
        placeholder="0"
        hintText="Optional: Estimated annual rental return percentage"
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
          title="Continue"
          onPress={() => props.setStep(prev => prev + 1)}
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          textStyle={{ marginHorizontal: 10 }}
        >
          <Icons.Arrow height={15} width={15}></Icons.Arrow>
        </Button>
      </View>
    </View>
  );
}
