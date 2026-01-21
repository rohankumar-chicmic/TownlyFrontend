import { View, Text, Dimensions, TextInput } from 'react-native';
import React from 'react';
import { ICONS } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';

export default function SearchInput() {
  const { dynamicStyles } = useStyles(styles);
  // const [text, onChangeText] = React.useState('Useless Text');
  const [text, onChangeText] = React.useState('');

  const { Colors } = useTheme();

  return (
    <View>
      <View style={dynamicStyles.container}>
        <ICONS.Search
          height={20}
          width={20}
          borderColor={Colors.textMuted}
          color={Colors.surface}
        />
        <TextInput
          placeholder="Search by location or property name..."
          placeholderTextColor={Colors.textMuted}
          onChangeText={onChangeText}
          value={text}
          style={dynamicStyles.input}
        />
      </View>
    </View>
  );
}
