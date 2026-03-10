import { View, TextInput, Keyboard, TextInputProps } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';

interface SearchPropsType extends TextInputProps {
  text: string;
}

export default function SearchInput(props: Readonly<SearchPropsType>) {
  const { dynamicStyles } = useStyles(styles);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<TextInput>(null);
  const { Colors } = useTheme();

  const localOnChangeText = (value: string) => {
    const sanitizedValue = value.replace(/^\s+/, '');
    props.onChangeText?.(sanitizedValue);
  };

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      ref.current?.blur();
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);

  return (
    <View>
      <View
        style={
          isFocused
            ? [dynamicStyles.container, { borderColor: Colors.primary }]
            : dynamicStyles.container
        }
      >
        <View style={{ paddingHorizontal: 10 }}>
          <Icons.Search
            height={20}
            width={20}
            borderColor={isFocused ? Colors.primary : Colors.textMuted}
            color={Colors.surface}
          />
        </View>
        <TextInput
          {...props}
          ref={ref}
          maxLength={150}
          cursorColor={Colors.primary}
          placeholder="Search by location or property name..."
          placeholderTextColor={Colors.textMuted}
          onChangeText={localOnChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={props.text}
          style={dynamicStyles.input}
        />
      </View>
    </View>
  );
}
