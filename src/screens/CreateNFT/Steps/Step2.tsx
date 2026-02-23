import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { View, Text } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { Icons } from '@utils/icons';
import { step2Schema } from '../validationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { NFTFormData, Step2FormData } from '../types';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: NFTFormData;
  setFormData: Dispatch<SetStateAction<NFTFormData>>;
}

const sanitizeInput = (text: string) => {
  const numbersOnly = text.replaceAll(/\D/g, '');
  const noLeadingZeros = numbersOnly.replace(/^0+(\d)/, '$1');
  return noLeadingZeros.slice(0, 10);
};

export default function Step2(props: Readonly<StepProps>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: yupResolver(step2Schema),
    mode: 'onSubmit',
    defaultValues: {
      totalPropertyValue: undefined,
      numberOfShares: undefined,
      rentalIncome: undefined,
      expectedAnnualYield: undefined,
    },
  });
  const totalPropertyValue = Number(watch('totalPropertyValue'));
  const numberOfShares = Number(watch('numberOfShares'));

  const pricePerShare =
    totalPropertyValue && numberOfShares && numberOfShares > 0
      ? totalPropertyValue / numberOfShares
      : 0;

  const formattedPricePerShare = pricePerShare
    ? `$${pricePerShare.toFixed(2)}`
    : '$ 0.00';

  const handleContinue = (data: Step2FormData) => {
    props.setFormData(prev => ({
      ...prev,
      ...data,
      pricePerUnit: pricePerShare,
    }));

    props.setStep(prev => prev + 1);
  };

  useEffect(() => {
    reset({
      totalPropertyValue: props.formData.totalPropertyValue,
      numberOfShares: props.formData.numberOfShares,
      rentalIncome: props.formData.rentalIncome,
      expectedAnnualYield: props.formData.expectedAnnualYield,
    });
  }, [props.formData, reset]);

  return (
    <View style={dynamicStyles.containerSurface}>
      <Text style={dynamicStyles.heading}>Financial Information</Text>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="totalPropertyValue"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Total Property Value (USD)"
                required
                placeholder="$ 0.0"
                keyboardType="number-pad"
                value={value?.toString() ?? ''}
                onChangeText={text => onChange(sanitizeInput(text))}
                hintText="Minimum Value: $1000"
                error={errors.totalPropertyValue?.message}
              />
            )}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="numberOfShares"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Total Number of Shares"
                required
                placeholder="0"
                keyboardType="number-pad"
                value={value?.toString() ?? ''}
                onChangeText={text => onChange(sanitizeInput(text))}
                hintText="Minimum: 100 Shares"
                error={errors.numberOfShares?.message}
              />
            )}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: Colors.primary,
          padding: 15,
          borderRadius: 10,
          margin: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ color: Colors.background, fontWeight: '600' }}>
            Auto-Calculated
          </Text>
          <Text style={{ color: Colors.background }}>Price Per Share</Text>
          <Text style={{ color: Colors.background }}>Calculated as:</Text>
          <Text style={{ color: Colors.background, fontWeight: '600'}}>
            {totalPropertyValue + '/' + numberOfShares}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: Colors.background,
              fontWeight: '600',
              fontSize: 22,
            }}
          >
            {formattedPricePerShare}
          </Text>
        </View>
      </View>

      <Controller
        control={control}
        name="rentalIncome"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Rental Income (per month)"
            required
            placeholder="0"
            keyboardType="number-pad"
            value={value?.toString() ?? ''}
            onChangeText={text => onChange(sanitizeInput(text))}
            error={errors.rentalIncome?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="expectedAnnualYield"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Expected Annual Yield (%)"
            required
            placeholder="0"
            keyboardType="number-pad"
            value={value?.toString() ?? ''}
            onChangeText={text => onChange(sanitizeInput(text))}
            error={errors.expectedAnnualYield?.message}
          />
        )}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Back"
          variant="outline"
          textStyle={{ color: Colors.primary }}
          onPress={() => props.setStep(prev => prev - 1)}
        />

        <Button title="Continue" onPress={handleSubmit(handleContinue)}>
          <Icons.Arrow height={15} width={15} />
        </Button>
      </View>
    </View>
  );
}
