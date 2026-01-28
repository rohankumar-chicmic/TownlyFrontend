import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import Step1 from './Steps/Step1';
import styles from './styles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';

export default function CreateNFTScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Colors.background }}
          contentContainerStyle={dynamicStyles.container}
        >
          <BackButton />
          <Text
            style={[dynamicStyles.heroPrimarytext, { alignSelf: 'center' }]}
          >
            Create Property NFT
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
            Tokenize your real estate asset and enable fractional ownership on
            OneChain
          </Text>
          <View
            style={{
              padding: 15,
              borderRadius: 15,
              backgroundColor: Colors.elevated,
              borderColor: Colors.border,
              marginBottom: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: Colors.primary,
                borderRadius: 25,
              }}
            ></View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: Colors.primary,
                borderRadius: 25,
              }}
            ></View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: Colors.primary,
                borderRadius: 25,
              }}
            ></View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: Colors.primary,
                borderRadius: 25,
              }}
            ></View>
          </View>

          <Step1 />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
