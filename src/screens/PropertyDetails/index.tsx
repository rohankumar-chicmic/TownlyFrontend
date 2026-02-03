import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

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
import {
  useGetPropertyDetailsQuery,
  useGetRelatedPropertiesQuery,
} from '@redux/PropertyApiReducer';
import InvestPropertyModal from '@components/molecules/InvestmentModal';

import { useAppSelector } from '@redux/store';
import KYCStatusModal from '@components/molecules/KYCModal';
import { KYC_STATUS } from '@redux/KYCReducer';
import { useAppNavigation } from '@hooks/useNavigation';

export default function PropertyDetails() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const route = useAppRoute();
  const params = route.params;
  const insets = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading, error, refetch } = useGetPropertyDetailsQuery(
    params.id,
  );
  const userToken = useAppSelector(state => state.auth.userToken);
  const kycStatus = useAppSelector(state => state.kyc.status);
  const navigation = useAppNavigation();
  const relatedProperties = useGetRelatedPropertiesQuery(params.id);

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
            uri: data?.imageUrl,
          }}
        />
      </PagerView>

      <View style={dynamicStyles.section}>
        <Text style={dynamicStyles.title}>{data?.name}</Text>
        <Text style={dynamicStyles.location}>
          {<Icons.Location height={10} width={10} color={Colors.primary} />}{' '}
          {data?.location}
        </Text>
        <View style={dynamicStyles.tag}>
          <Text style={dynamicStyles.tagText}>{data?.propertyType}</Text>
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
            {'$'}
            {data?.totalValue}
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
            {Number(data?.pricePerUnitEth ?? 10).toFixed(5)}
            {' ETH'}
          </Text>
        </View>
        <View style={[dynamicStyles.containerStyle]}>
          <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
            Annual Yield
          </Text>
          <Text
            style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}
          >
            {data?.annualYieldPercent}
            {'%'}
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
            {data?.availableUnits}
            {'/'}
            {data?.totalUnits}
          </Text>
        </View>
      </ScrollView>

      <View style={[dynamicStyles.section, { paddingTop: 5 }]}>
        <Text style={dynamicStyles.sectionTitle}>Property Highlights</Text>
        <Text style={[{ fontSize: 15, color: Colors.textPrimary }]}>
          {data?.description}
        </Text>
      </View>

      <Button
        title="Invest"
        disabled={!userToken}
        onPress={() => setShowModal(true)}
        size="lg"
        style={{ margin: 15 }}
      ></Button>

      <View style={[dynamicStyles.section, { paddingHorizontal: 15 }]}>
        <Text style={[dynamicStyles.sectionTitle, { paddingHorizontal: 10 }]}>
          Related Properties
        </Text>
        <PropertyListing
          horizontal
          data={relatedProperties.data}
        ></PropertyListing>
      </View>
      {kycStatus === 2 ? (
        <InvestPropertyModal
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      ) : (
        <KYCStatusModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onStartKYC={()=> navigation.navigate('KycScreen')}
        />
      )}
    </ScrollView>
  );
}
