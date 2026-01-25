import { View, TextInput, Text, Pressable, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';

import Button from '@components/atoms/Button';

export default function SearchInput() {
  const { dynamicStyles } = useStyles(styles);
  const [text, setText] = useState('');
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
    <View >
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
          onChangeText={setText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={text}
          style={dynamicStyles.input}
        />
        <Pressable
          onPress={() => console.log('filter')}
          style={{
            backgroundColor: Colors.primaryDark,
            padding: 4,
            borderRadius: 5,
            marginHorizontal: 4
          }}
        >
          <Text style={{ color: Colors.background }}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}
