import React from 'react';
import { View, Text, Platform, Image } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import BackButton from '@components/atoms/BackButton';

import styles from './styles';
export default function ListedPropertiesScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Colors.background }}
          contentContainerStyle={dynamicStyles.container}
        >
          <BackButton />
          <Text
            style={[dynamicStyles.heroPrimarytext, { alignSelf: 'center' }]}
          >
            My Listed Properties
          </Text>
          <Text
            style={[
              {
                alignSelf: 'center',
                color: Colors.textSecondary,
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 20,
              },
            ]}
          >
            Manage and track the performance of the properties you have
            tokenized and listed on the marketplace.
          </Text>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
