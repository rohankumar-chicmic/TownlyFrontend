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

interface FormInputType extends TextInputProps {
  label?: string;
  required?: boolean;
  labelStyle?: TextStyle;
  style?: ViewStyle;
  placeholder?: string;
  hintText?: string;
}

export default function FormInput(props: FormInputType) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={{padding: 5}}>
      <Text style={[dynamicStyles.label, props.labelStyle]}>
        {props.label}{' '}
        {props.required && <Text style={{ color: Colors.primary }}>*</Text>}
      </Text>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={Colors.textMuted}
        style={[
          dynamicStyles.input,
          { borderColor: Colors.border, backgroundColor: Colors.background },
          props.style,
        ]}
        {...props}
      />
      {props.hintText && (
        <Text style={{ color: Colors.textSecondary, fontSize: 10, marginLeft:5, marginBottom: 4}}>
          {props.hintText}
        </Text>
      )}
    </View>
  );
}
