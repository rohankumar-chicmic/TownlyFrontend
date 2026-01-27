import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import PagerView from 'react-native-pager-view';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { useAppRoute } from '@hooks/useAppRoute';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';
import Button from '@components/atoms/Button';
import PropertyListing from '@components/molecules/PropertyListing';
import { Icons } from '@utils/icons';
import { findLastIndex } from 'eslint.config';

export default function PropertyDetails() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const route = useAppRoute();
  const params = route.params;
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);

  return (
    <ScrollView
      style={[
        dynamicStyles.screen,
        {
          paddingTop: insets.top,
        },
      ]}
      contentContainerStyle={{ padding: 5, paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <BackButton />

      <PagerView style={dynamicStyles.heroImage} pageMargin={10}>
        <Image
          source={{
            uri: 'https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png',
          }}
        />
        <Image
          source={{
            uri: 'https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png',
          }}
        />
        <Image
          source={{
            uri: 'https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png',
          }}
        />
      </PagerView>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.title}>Suburban Family Home</Text>
        <Text style={dynamicStyles.location}>
          {<Icons.Location height={10} width={10} />} 5943 Marlow St, Detroit,
          MI
        </Text>
        <View style={dynamicStyles.tag}>
          <Text style={dynamicStyles.tagText}>Available</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          paddingVertical: 10,
          marginTop: 10,
        }}
      >
        <View style={dynamicStyles.containerStyle}>
          <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
            Total Value
          </Text>
          <Text
            style={{
              color: Colors.textPrimary,
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            $409,700
          </Text>
        </View>
        <View style={dynamicStyles.containerStyle}>
          <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
            Price/Share
          </Text>
          <Text
            style={{
              color: Colors.textPrimary,
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            10 ETH
          </Text>
        </View>
        <View style={[dynamicStyles.containerStyle]}>
          <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
            Annual Yield
          </Text>
          <Text
            style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}
          >
            9.2%
          </Text>
        </View>
        <View style={[dynamicStyles.containerStyle]}>
          <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
            Available Share
          </Text>
          <Text
            style={{
              color: Colors.textPrimary,
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            1000/10000
          </Text>
        </View>
      </ScrollView>

      <View style={[dynamicStyles.section, { paddingTop: 5 }]}>
        <Text style={dynamicStyles.sectionTitle}>Property Highlights</Text>
        <Text style={[{ fontSize: 15, color: Colors.textPrimary }]}>
          • Single Family property in Detroit, MI
        </Text>
        <Text style={[{ fontSize: 15, color: Colors.textPrimary }]}>
          • Total 10,000 shares available
        </Text>
        <Text style={[{ fontSize: 15, color: Colors.textPrimary }]}>
          • Monthly rent: $3,145
        </Text>
        <Text style={[{ fontSize: 15, color: Colors.textPrimary }]}>
          • Current occupancy: 100%
        </Text>
        <Text style={[{ fontSize: 15, color: Colors.textPrimary }]}>
          • Deployed on Polygon blockchain
        </Text>
      </View>

      <Button
        title="Invest"
        onPress={() => setShowModal(true)}
        size="lg"
        style={{ margin: 15 }}
      ></Button>

      <View style={[dynamicStyles.section, {paddingBottom: 40}]}>
        <Text style={dynamicStyles.sectionTitle}>Related Properties</Text>
        <PropertyListing horizontal style={{}}></PropertyListing>
      </View>
    </ScrollView>
  );
}
