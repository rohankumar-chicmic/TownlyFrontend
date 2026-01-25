import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import PagerView from 'react-native-pager-view'
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { useAppRoute } from '@hooks/useAppRoute';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PropertyDetails() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const route = useAppRoute();
  const params = route.params;
  const insets = useSafeAreaInsets();

  console.log(params);

  return (
    <ScrollView
      style={[
        dynamicStyles.screen,
        {
          paddingTop: insets.top,
          width: '100%',
        },
      ]}
      contentContainerStyle={{ padding: 5, paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}

    >
      <PagerView>

        <Image
          source={{ uri: 'https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png' }}
          style={dynamicStyles.heroImage}
        />
      </PagerView>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.title}>Suburban Family Home</Text>
        <Text style={dynamicStyles.location}>
          5943 Marlow St, Detroit, MI
        </Text>

        <View style={dynamicStyles.tag}>
          <Text style={dynamicStyles.tagText}>Available</Text>
        </View>
      </View>

      <View style={dynamicStyles.metrics}>

      </View>

      <View style={dynamicStyles.investCard}>
        <Text style={dynamicStyles.cardTitle}>Invest in Property</Text>

        <View style={dynamicStyles.inputRow}>
          <Text style={dynamicStyles.label}>Shares</Text>
          <Text style={dynamicStyles.value}>10</Text>
        </View>

        <View style={dynamicStyles.inputRow}>
          <Text style={dynamicStyles.label}>Price per Share</Text>
          <Text style={dynamicStyles.value}>10 ETH</Text>
        </View>

        <View style={dynamicStyles.inputRow}>
          <Text style={dynamicStyles.label}>Total Cost</Text>
          <Text style={dynamicStyles.total}>100 ETH</Text>
        </View>

        <TouchableOpacity style={dynamicStyles.cta}>
          <Text style={dynamicStyles.ctaText}>Invest 100 ETH</Text>
        </TouchableOpacity>
      </View>

      {/* Highlights */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Property Highlights</Text>

      </View>

      {/* Related */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Related Properties</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        </ScrollView>
      </View>
    </ScrollView>

  );
}

/* --- Subcomponents --- */

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  const { Colors } = useTheme();
  return (
    <View style={{ width: '48%', marginBottom: 12 }}>
      <Text style={{ color: Colors.textSecondary, fontSize: 13 }}>
        {label}
      </Text>
      <Text
        style={{
          color: highlight ? Colors.primary : Colors.textPrimary,
          fontSize: 16,
          fontWeight: '500',
        }}
      >
        {value}
      </Text>
    </View>
  );
}
