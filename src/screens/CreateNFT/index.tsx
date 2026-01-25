import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '@hooks/useTheme';

import AppInput from '@components/atoms/FormInput';
import Button from '@components/atoms/Button';
import StepIndicator from '@components/molecules/StepsIndicator';

export default function CreateNFTScreen() {
  const { Colors } = useTheme();

  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    documentName: '',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Property NFT</Text>
        <Text style={styles.subtitle}>
          Tokenize your real estate asset and enable fractional ownership
        </Text>

        <StepIndicator currentStep={0} />

        <View style={[styles.card,]}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <Text style={styles.sectionSubtitle}>
            Let’s start with the basic information
          </Text>

          <AppInput
            label="Property Name"
            required
            placeholder="e.g. Sunset Villa, Downtown Loft"
            value={form.name}
            maxLength={100}
            onChangeText={(text) =>
              setForm({ ...form, name: text })
            }
          />

          <AppInput
            label="Property Description"
            placeholder="Describe the property..."
            multiline
            maxLength={500}
            value={form.description}
            onChangeText={(text) =>
              setForm({ ...form, description: text })
            }
          />

          <AppInput
            label="Location"
            placeholder="e.g. Miami, Florida"
            value={form.location}
            onChangeText={(text) =>
              setForm({ ...form, location: text })
            }
          />

          <AppInput
            label="Document Name"
            placeholder="e.g. Property Deed"
            value={form.documentName}
            onChangeText={(text) =>
              setForm({ ...form, documentName: text })
            }
          />

          <Button title="Continue" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 16,
  },
});