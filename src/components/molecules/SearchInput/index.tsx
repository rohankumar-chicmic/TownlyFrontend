import { View, TextInput, Text, Pressable, Keyboard } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';

import Button from '@components/atoms/Button';

interface searchPropsType{
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  onPress: () => void;
}

export default function SearchInput(props: searchPropsType) {
  const { dynamicStyles } = useStyles(styles);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<TextInput>(null);
  const { Colors } = useTheme();

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
          ref={ref}
          placeholder="Search by location or property name..."
          placeholderTextColor={Colors.textMuted}
          onChangeText={props.setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={props.text}
          style={dynamicStyles.input}
        />
        <Button
          onPress={props.onPress}
          size="sm"
          style={{
            marginHorizontal: 4,
          }}
        >
          <Text
            style={{
              color: Colors.background,
              fontWeight: '600',
              fontSize: 12,
            }}
          >
            Search
          </Text>
        </Button>
      </View>
    </View>
  );
}
