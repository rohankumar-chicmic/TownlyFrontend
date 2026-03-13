import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

interface FormInputType extends TextInputProps {
  label?: string;
  required?: boolean;
  labelStyle?: TextStyle;
  style?: ViewStyle;
  placeholder?: string;
  hintText?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default function FormInput(props: Readonly<FormInputType>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={{ padding: 5, paddingBottom: 0 }}>
      <Text style={[dynamicStyles.label, props.labelStyle]}>
        {props.label}
        {props.required && <Text style={{ color: Colors.primary }}>*</Text>}
      </Text>
      <TextInput
        placeholder={props.placeholder}
        maxLength={100}
        textAlignVertical="top"
        placeholderTextColor={Colors.textMuted}
        style={[
          dynamicStyles.input,
          {
            borderColor: Colors.border,
            backgroundColor: Colors.background,
            color: props.readOnly ? Colors.textMuted : Colors.textPrimary,
          },
          props.style,
        ]}
        {...props}
      />

      <Text
        style={{
          color: props.error ? Colors.error : Colors.textSecondary,
          fontSize: 10,
          marginLeft: 5,
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        {(props.error as string) || props.hintText}
      </Text>
    </View>
  );
}
