import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { useAppRoute } from '@hooks/useAppRoute';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';
import Button from '@components/atoms/Button';
import CardContainer from '@components/molecules/CardContainer2';

import { Icons } from '@utils/icons';
import {
  useGetPropertyDetailsQuery,
  useGetRelatedPropertiesQuery,
} from '@redux/PropertyApiReducer';
import InvestPropertyModal from '@components/molecules/InvestmentModal';

import { useAppSelector } from '@redux/store';
import KYCStatusModal from '@components/molecules/KYCModal';
import { useAppNavigation } from '@hooks/useNavigation';

export default function PropertyDetails() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const route = useAppRoute();
  const params = route.params;
  const [showModal, setShowModal] = useState(false);
  const { data } = useGetPropertyDetailsQuery(params.id);

  const userToken = useAppSelector(state => state.auth.userToken);
  const kycStatus = useAppSelector(state => state.kyc.status);
  const navigation = useAppNavigation();
  const relatedProperties = useGetRelatedPropertiesQuery(params.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.elevated }}>
      <ScrollView
        style={[dynamicStyles.screen]}
        contentContainerStyle={{
          paddingBottom: 20,
          backgroundColor: Colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />

        <View style={dynamicStyles.heroImage}>
          <Image
            source={{ uri: data?.imageUrl }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.title}>{String(data?.name ?? '')}</Text>
          <Text style={dynamicStyles.location}>
            <Icons.Location height={10} width={10} color={Colors.primary} />
            {' ' + String(data?.location ?? '')}
          </Text>
          <View style={dynamicStyles.tag}>
            <Text style={dynamicStyles.tagText}>
              {String(data?.propertyType ?? '')}
            </Text>
          </View>
          {data?.userInvestedAmountEth ? (
            <View style={dynamicStyles.investmentCard}>
              <View style={dynamicStyles.investmentIcon}>
                <MaterialIcons name="payments" size={24} color="black" />
              </View>
              <View>
                <Text style={dynamicStyles.investmentTitle}>
                  Your Investment
                </Text>
                <Text
                  style={{
                    color: Colors.textPrimary,
                    fontSize: 18,
                    fontWeight: '700',
                  }}
                >
                  {Number(data?.userInvestedAmountEth).toFixed(4)}
                  <Text style={{ fontSize: 14 }}> ETH</Text>
                </Text>
              </View>
            </View>
          ) : null}
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
              {String(data?.totalValue ?? '')}
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
              {Number(data?.pricePerUnitEth ?? 0).toFixed(5)}
              {' ETH'}
            </Text>
          </View>

          <View style={dynamicStyles.containerStyle}>
            <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
              Annual Yield
            </Text>
            <Text
              style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}
            >
              {String(data?.annualYieldPercent ?? '')}
              {'%'}
            </Text>
          </View>

          <View style={dynamicStyles.containerStyle}>
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
              {String(data?.availableUnits ?? '')}
              {'/'}
              {String(data?.totalUnits ?? '')}
            </Text>
          </View>
        </ScrollView>

        <View style={[dynamicStyles.section, { paddingTop: 5 }]}>
          <Text style={dynamicStyles.sectionTitle}>Property Highlights</Text>
          <Text style={{ fontSize: 15, color: Colors.textPrimary }}>
            {String(data?.description ?? '')}
          </Text>
        </View>

        <Button
          title={data?.userInvestedAmountEth ? 'Invest More' : 'Invest'}
          disabled={!userToken || !data?.availableUnits}
          onPress={() => setShowModal(true)}
          size="lg"
          style={{ margin: 15 }}
        />

        <View style={[dynamicStyles.section, { paddingHorizontal: 15 }]}>
          <Text style={[dynamicStyles.sectionTitle, { paddingHorizontal: 10 }]}>
            Related Properties
          </Text>
          <FlatList
            horizontal
            data={relatedProperties.data ?? []}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View style={{ width: Dimensions.get('screen').width * 0.8 }}>
                <CardContainer
                  {...item}
                  description={item.description ?? undefined}
                />
              </View>
            )}
            contentContainerStyle={{ gap: 10, paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {kycStatus === 2 ? (
          <InvestPropertyModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            id={String(data?.id ?? '')}
            pricePerShare={Number(data?.pricePerUnitEth ?? 0)}
            availableUnits={Number(data?.availableUnits ?? 0)}
          />
        ) : (
          <KYCStatusModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onStartKYC={() => navigation.navigate('KycScreen')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
