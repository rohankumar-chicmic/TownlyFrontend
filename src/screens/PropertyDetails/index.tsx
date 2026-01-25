import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';

const { width } = Dimensions.get('window');

export default function PropertyDetails() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  return (
    <ScrollView
      style={dynamicStyles.screen}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Image */}
      <Image
        source={{ uri: 'https://your-image-url' }}
        style={dynamicStyles.heroImage}
      />

      {/* Title Section */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.title}>Suburban Family Home</Text>
        <Text style={dynamicStyles.location}>
          📍 5943 Marlow St, Detroit, MI
        </Text>

        <View style={dynamicStyles.tag}>
          <Text style={dynamicStyles.tagText}>Available</Text>
        </View>
      </View>

      {/* Metrics */}
      <View style={dynamicStyles.metrics}>
        <Metric label="Total Value" value="$409,700" />
        <Metric label="Price / Share" value="10 ETH" />
        <Metric label="Annual Yield" value="9.2%" highlight />
        <Metric label="Available" value="1000 / 1000" />
      </View>

      {/* Invest Card */}
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
        <Bullet text="Single Family property in Detroit, MI" />
        <Bullet text="Monthly rent: $3,145" />
        <Bullet text="Current occupancy: 100%" />
        <Bullet text="Blockchain verified ownership" />
      </View>

      {/* Related */}
      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.sectionTitle}>Related Properties</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <RelatedCard title="Arbit Cottage" />
          <RelatedCard title="Duke Palace" />
          <RelatedCard title="Studio Beach" />
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

function Bullet({ text }: { text: string }) {
  const { Colors } = useTheme();
  return (
    <Text style={{ color: Colors.textSecondary, marginBottom: 6 }}>
      • {text}
    </Text>
  );
}

function RelatedCard({ title }: { title: string }) {
  const { Colors } = useTheme();
  return (
    <View
      style={{
        width: 160,
        marginRight: 12,
        backgroundColor: Colors.surface,
        borderRadius: 10,
        padding: 8,
      }}
    >
      <View
        style={{
          height: 90,
          backgroundColor: Colors.border,
          borderRadius: 8,
          marginBottom: 8,
        }}
      />
      <Text
        style={{ color: Colors.textPrimary, fontSize: 14 }}
        numberOfLines={1}
      >
        {title}
      </Text>
    </View>
  );
}
