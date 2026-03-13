import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { useAppRoute } from '@hooks/useAppRoute';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';
import Button from '@components/atoms/Button';
import CardContainer from '@components/molecules/CardContainer2';
import CardContainerSkeleton from '@components/molecules/CardContainerSkeleton';
import useImages from '@hooks/useImages';

import { Icons } from '@utils/icons';
import {
  useGetPropertyDetailsQuery,
  useGetRelatedPropertiesQuery,
  useInvestmentInfoQuery,
} from '@redux/PropertyApiReducer';
import InvestPropertyModal from '@components/molecules/InvestmentModal';

import { useAppSelector } from '@redux/store';
import KYCStatusModal from '@components/molecules/KYCModal';
import { useAppNavigation } from '@hooks/useNavigation';
import InvestmentInfo from '@components/molecules/InvestmentInfo';
import PropertyDetailsSkeleton from '@components/molecules/PropertyDetailsSkeleton';
import { throttle } from '@utils/utility';
import { ROUTES } from 'src/navigation/constants';
import FastImage from 'react-native-fast-image';
import { useNetInfo } from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

export default function PropertyDetails() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const route = useAppRoute();
  const params = route.params;
  const [showModal, setShowModal] = useState(false);
  const [invested, setInvested] = useState(false);
  const [imageError, setImageError] = useState(false);
  const Images = useImages();

  const { data, refetch } = useGetPropertyDetailsQuery(
    params?.item?.id || params?.id,
  );
  const { data: investmentData } = useInvestmentInfoQuery(
    params?.item?.id || params?.id,
  );

  const imageSource =
    !data?.imageUrl || imageError ? Images.FALLBACK : { uri: data?.imageUrl };
  const userToken = useAppSelector(state => state.auth.userToken);
  const kycStatus = useAppSelector(state => state.kyc.status);
  const navigation = useAppNavigation();
  const relatedProperties = useGetRelatedPropertiesQuery(
    params?.item?.id || params?.id,
  );
  const throttledHandleCardPressed = throttle(item =>
    navigation.push(ROUTES.PROPERTY_DETAILS, { item: item }),
  );

  const modalOnClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    setShowModal(false);
    setInvested(true);
    refetch();
  };

  const { isConnected } = useNetInfo();

  const isLoading = !data || !investmentData || !relatedProperties.data;

  const fallbackProperty = params?.item ?? null;

  const property = data ?? fallbackProperty;

  useEffect(() => {
    if (invested) {
      Toast.show({
        type: 'success',
        text1: 'Investment Successfull',
        text2: 'Invested in Property ' + property?.name + ' Successfully',
        visibilityTime: 1500,
      });
      setInvested(false);
    }
  }, [invested, property?.name]);

  if (isConnected && isLoading) return <PropertyDetailsSkeleton />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.elevated }}>
      <View>
        <BackButton
          style={{ position: 'absolute', zIndex: 100, left: 10, top: 10 }}
        />
      </View>
      <ScrollView
        style={[dynamicStyles.screen]}
        contentContainerStyle={{
          paddingBottom: 20,
          backgroundColor: Colors.background,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={dynamicStyles.heroImage}>
          <FastImage
            source={imageSource}
            defaultSource={Images.FALLBACK}
            onError={() => setImageError(true)}
            resizeMode={FastImage.resizeMode.cover}
            style={{ height: '100%', width: '100%' }}
          />
        </View>
        {!isConnected && (
          <View
            style={{
              backgroundColor: '#FFF3CD',
              paddingVertical: 8,
              paddingHorizontal: 15,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#FFE69C',
            }}
          >
            <Text style={{ color: '#856404', fontSize: 13 }}>
              You are offline. Property data is not available.
            </Text>
          </View>
        )}

        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.title}>
            {String(property?.name ?? '')}
          </Text>
          <Text style={dynamicStyles.location}>
            <Icons.Location height={10} width={10} color={Colors.primary} />
            {' ' + String(property?.location ?? '')}
          </Text>
          <View style={dynamicStyles.tag}>
            <Text style={dynamicStyles.tagText}>
              {String(property?.propertyType ?? '')}
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
              <View>
                <Text style={dynamicStyles.investmentTitle}>Tokens Owned</Text>
                <Text
                  style={{
                    color: Colors.textPrimary,
                    fontSize: 18,
                    fontWeight: '700',
                  }}
                >
                  {Number(data?.tokensOwned)}
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
              Final Risk Score
            </Text>
            <Text
              style={{
                color: Colors.textPrimary,
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              {data?.riskScore ? data?.riskScore + '/10' : ''}
            </Text>
          </View>

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
              {String(data?.totalValue.toLocaleString() ?? '')}
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
              {Number(property?.pricePerUnitEth ?? 0).toFixed(5)}
              {' ETH'}
            </Text>
          </View>

          <View style={dynamicStyles.containerStyle}>
            <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
              Annual Yield
            </Text>
            <Text
              style={{ color: Colors.success, fontSize: 18, fontWeight: '500' }}
            >
              {String(property?.annualYieldPercent ?? '')}
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
              {String(property?.availableUnits ?? '')}
              {'/'}
              {String(data?.totalUnits ?? '')}
            </Text>
          </View>
        </ScrollView>
        <Button
          title={data?.userInvestedAmountEth ? 'Invest More' : 'Invest'}
          disabled={!userToken || !data?.availableUnits}
          onPress={() => setShowModal(true)}
          size="lg"
          style={{ margin: 15 }}
        />

        <View style={[dynamicStyles.section, { paddingTop: 5 }]}>
          <Text style={dynamicStyles.sectionTitle}>Property Highlights:</Text>
          <Text style={{ fontSize: 15, color: Colors.textPrimary }}>
            {String(data?.description ?? '')}
          </Text>
        </View>

        <View
          style={[
            dynamicStyles.section,
            {
              paddingHorizontal: 15,
              borderBottomColor: Colors.border,
              backgroundColor: Colors.surface,
              borderTopColor: Colors.border,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              paddingBottom: 5,
              marginTop: 15,
              shadowColor: '#000',
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
        >
          <Text
            style={[
              dynamicStyles.sectionTitle,
              {
                paddingHorizontal: 8,
                marginBottom: 0,
              },
            ]}
          >
            Related Properties:
          </Text>
          <FlatList
            horizontal
            data={
              relatedProperties.isLoading
                ? (new Array(3).fill(null) as null[])
                : (relatedProperties.data ?? [])
            }
            keyExtractor={(item, index) =>
              item ? `${item.id}-${index}` : `skeleton-${index}`
            }
            renderItem={({ item, index }) =>
              relatedProperties.isLoading || !item ? (
                <View
                  style={{
                    width: Dimensions.get('screen').width * 0.8,
                    padding: 10,
                  }}
                >
                  <CardContainerSkeleton />
                </View>
              ) : (
                <View style={{ width: Dimensions.get('screen').width * 0.8 }}>
                  <CardContainer
                    {...item}
                    description={item.description ?? undefined}
                    onClick={() => throttledHandleCardPressed(item)}
                  />
                </View>
              )
            }
            contentContainerStyle={{ gap: 10, padding: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={[dynamicStyles.section, { paddingHorizontal: 15 }]}>
          <Text style={[dynamicStyles.sectionTitle, { marginBottom: 10 }]}>
            Investment Details:
          </Text>
          {investmentData ? (
            <InvestmentInfo
              data={{
                minimumInvestmentShares:
                  investmentData?.minimumInvestmentShares ?? 1,
                dividendFrequency:
                  investmentData?.dividendFrequency ?? 'Monthly',
                investmentType: investmentData?.propertyType ?? 'Real Estate',
                security: 'Blockchain Verified',
                propertyOwnerUserId: investmentData?.propertyOwnerUserId,
                expectedAnnualReturnPercent:
                  investmentData?.expectedAnnualReturnPercent ?? 0,
                pricePerShareUsd:
                  investmentData?.totalValue / investmentData?.totalUnits || 0,
                pricePerShareEth: Number(investmentData?.pricePerUnitEth ?? 0),
              }}
            />
          ) : null}
        </View>

        {kycStatus === 2 ? (
          <InvestPropertyModal
            visible={showModal}
            name={String(data?.name ?? '')}
            onClose={modalOnClose}
            handleSubmit={handleSubmit}
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
