import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import FormInput from '@components/atoms/FormInput';
import Button from '@components/atoms/Button';

export default function Step1() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 15,
        backgroundColor: Colors.elevated,
        borderColor: Colors.border,
      }}
    >
      <Text style={[dynamicStyles.heading]}>PropertyDetails</Text>
      <Text
        style={{
          color: Colors.textSecondary,
          marginBottom: 10,
          paddingVertical: 5,
          fontSize: 12,
        }}
      >
        Let's start with the basic information about your property
      </Text>
      <Text style={dynamicStyles.label}>
        Property Name <Text style={{ color: Colors.primary }}>*</Text>
      </Text>
      <TextInput
        placeholder={'e.g., Sunset Villa, Downtown Loft'}
        placeholderTextColor={Colors.textMuted}
        style={[
          dynamicStyles.input,
          { borderColor: Colors.border, backgroundColor: Colors.background },
        ]}
      />
      <Text style={dynamicStyles.label}>
        Property Description <Text style={{ color: Colors.primary }}>*</Text>
      </Text>
      <TextInput
        placeholder={'Decribe the Property'}
        placeholderTextColor={Colors.textMuted}
        style={[
          dynamicStyles.input,
          { borderColor: Colors.border, backgroundColor: Colors.background },
        ]}
      />
      <Text style={dynamicStyles.label}>
        Location <Text style={{ color: Colors.primary }}>*</Text>
      </Text>
      <TextInput
        placeholder={'e.g., Miami, Florida'}
        placeholderTextColor={Colors.textMuted}
        style={[
          dynamicStyles.input,
          { borderColor: Colors.border, backgroundColor: Colors.background },
        ]}
      />
      <Text style={dynamicStyles.label}>
        Document Name <Text style={{ color: Colors.primary }}>*</Text>
      </Text>
      <TextInput
        placeholder={'e.g., Property Deed, Tax Records'}
        placeholderTextColor={Colors.textMuted}
        style={[
          dynamicStyles.input,
          { borderColor: Colors.border, backgroundColor: Colors.background },
        ]}
      />

      <Button
        title="Continue"
        onPress={() => console.log('nothing')}
        style={{ alignSelf: 'flex-end', marginTop: 10}}
      ></Button>
    </View>
  );
}
