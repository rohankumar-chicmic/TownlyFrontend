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
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export default function FormInput(props: FormInputType) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={{ padding: 5 }}>
      <Text style={[dynamicStyles.label, props.labelStyle]}>
        {props.label}{' '}
        {props.required && <Text style={{ color: Colors.primary }}>*</Text>}
      </Text>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={Colors.textMuted}
        style={[
          dynamicStyles.input,
          {
            borderColor: Colors.border,
            backgroundColor: Colors.background,
            color: Colors.textPrimary,
          },
          props.style,
        ]}
        {...props}
      />
      {props.error
        ? (
            <Text
              style={{
                color: Colors.error,
                fontSize: 10,
                marginLeft: 5,
                marginBottom: 4,
              }}
            >
              {props.error as string}
            </Text>
          )
        : props.hintText && (
            <Text
              style={{
                color: Colors.textSecondary,
                fontSize: 10,
                marginLeft: 5,
                marginBottom: 4,
              }}
            >
              {props.hintText}
            </Text>
          )}
    </View>
  );
}
