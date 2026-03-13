import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';

import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { useAppRoute } from '@hooks/useAppRoute';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';
import Button from '@components/atoms/Button';
import Badge from '@components/atoms/Badge';

import useImages from '@hooks/useImages';
import { Icons } from '@utils/icons';
import { useDeletePropertyMutation } from '@redux/PropertyApiReducer';
import { useAppNavigation } from '@hooks/useNavigation';
import DeletePropertyModal from '@components/molecules/DeletePropertyModal';
import { ROUTES } from 'src/navigation/constants';
import Toast from 'react-native-toast-message';
import EditButton from '@components/atoms/EditButton';
import FastImage from 'react-native-fast-image';
import PropertyDetailsSkeleton from '@components/molecules/PropertyDetailsSkeleton';
import { usePropertyDetails } from 'src/db/hooks/usePropertyDetails';
import { addOfflineTask } from 'src/db/hooks/useOfflineQueue';
import { OfflineTaskType } from '@utils/types';
import { useNetInfo } from '@react-native-community/netinfo';

export default function UserOwnedProperty() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const route = useAppRoute();
  const params = route.params;
  const navigation = useAppNavigation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { isConnected } = useNetInfo();
  const [imageError, setImageError] = useState(false);
  const Images = useImages();

  const { data, isLoading, isOffline } = usePropertyDetails(params?.id ?? '');
  const imageSource =
    !data?.imageUrl || imageError ? Images.FALLBACK : { uri: data?.imageUrl };

  const [deleteProperty, { isLoading: isDeleting }] =
    useDeletePropertyMutation();

  const handleDeleteConfirm = async () => {
    if (isOffline) {
      await addOfflineTask(OfflineTaskType.DELETE_PROPERTY, {
        propertyId: params?.id,
      });
      setShowDeleteModal(false);
      Toast.show({
        type: 'info',
        text1: 'Property deletion queued',
        text2: `${data?.name} will be deleted once online.`,
      });
      navigation.goBack();
      return;
    }

    try {
      await deleteProperty(params?.id).unwrap();
      setIsDeleted(true);
      setShowDeleteModal(false);
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Property Removed',
        text2: `${data?.name} has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Delete failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Property Not Removed',
        text2: `${data?.name} could not be deleted.`,
      });
    }
  };

  const handleClickEdit = async () => {
    try {
      navigation.navigate(ROUTES.CREATE_NFT, {
        initialValues: data,
        isEdit: true,
        isActiveProperty: params?.status === 2,
      });
    } catch (e) {
      console.error('Error in the user owner property edition', e);
    }
  };

  if (isLoading) return <PropertyDetailsSkeleton />;

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
        <View style={{ position: 'absolute', zIndex: 100, left: 10, top: 10 }}>
          <BackButton />
        </View>

        <View style={{ position: 'absolute', zIndex: 100, right: 10, top: 10 }}>
          {(data?.status === 1 || data?.status === 5 || data?.status === 2) && (
            <EditButton onPress={handleClickEdit} />
          )}
        </View>

        <View style={dynamicStyles.heroImage}>
          <FastImage
            source={imageSource}
            defaultSource={Images.FALLBACK}
            onError={() => setImageError(true)}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        {isOffline && (
          <View
            style={{
              backgroundColor: Colors.warning,
              padding: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: Colors.background }}>
              Offline Mode: showing cached property data
            </Text>
          </View>
        )}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.title}>{data?.name}</Text>
          <Text style={dynamicStyles.location}>
            {<Icons.Location height={10} width={10} color={Colors.primary} />}{' '}
            {data?.location}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <View style={dynamicStyles.tag}>
              <Text style={dynamicStyles.tagText}>{data?.propertyType}</Text>
            </View>
            <View
              style={{ height: '85%', width: '25%', alignItems: 'flex-end' }}
            >
              <Badge status={data?.status} />
            </View>
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
          {/* Property Stats */}
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
              {'$' + data?.totalValue}
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
              {Number(data?.pricePerUnitEth ?? 0).toFixed(5)} ETH
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text style={{ color: Colors.textSecondary, fontSize: 15 }}>
              Annual Yield
            </Text>
            <Text
              style={{ color: Colors.primary, fontSize: 18, fontWeight: '500' }}
            >
              {data?.annualYieldPercent}%
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
              {data?.availableUnits}/{data?.totalUnits}
            </Text>
          </View>
        </ScrollView>

        <View style={[dynamicStyles.section, { paddingTop: 5 }]}>
          <Text style={dynamicStyles.sectionTitle}>Property Highlights</Text>
          <Text style={{ fontSize: 15, color: Colors.textPrimary }}>
            {data?.description}
          </Text>
        </View>

        {data?.rejectionReason && (
          <View
            style={[
              dynamicStyles.containerStyle,
              { margin: 20, borderColor: Colors.warning },
            ]}
          >
            <Text
              style={[dynamicStyles.sectionTitle, { color: Colors.warning }]}
            >
              {data.status === 5
                ? 'Modification Requested:'
                : 'Rejected Reason'}
            </Text>
            <Text style={{ fontSize: 15, color: Colors.textPrimary }}>
              {data?.rejectionReason}
            </Text>
          </View>
        )}

        {data?.canDelete && (
          <View style={{ width: '90%', alignSelf: 'center', margin: 20 }}>
            <Button
              variant="outline"
              textStyle={{ color: Colors.primary }}
              title="Delete Property"
              onPress={() => setShowDeleteModal(true)}
            />
          </View>
        )}

        {data?.documents?.length > 0 && (
          <View style={[dynamicStyles.section, { paddingTop: 5 }]}>
            <Text style={dynamicStyles.sectionTitle}>Property Documents</Text>
            {data?.documents.map((doc: any) => (
              <View
                key={doc.fileName}
                style={{
                  marginTop: 15,
                  borderWidth: 1,
                  borderColor: Colors.border,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <TouchableOpacity
                  onPress={() => Linking.openURL(doc.documentUrl)}
                  style={{
                    padding: 10,
                    backgroundColor: Colors.elevated,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: Colors.textPrimary,
                      fontSize: 15,
                      fontWeight: '500',
                    }}
                  >
                    {doc.title || doc.fileName}
                  </Text>
                  <Text style={{ color: Colors.primary }}>Open</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <DeletePropertyModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </SafeAreaView>
  );
}
