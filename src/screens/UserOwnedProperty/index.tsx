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

import { Icons } from '@utils/icons';
import {
  useDeletePropertyMutation,
  useGetMyPropertyDetailsQuery,
} from '@redux/PropertyApiReducer';
import { useAppNavigation } from '@hooks/useNavigation';
import DeletePropertyModal from '@components/molecules/DeletePropertyModal';
import { ROUTES } from 'src/navigation/constants';
import Toast from 'react-native-toast-message';
import EditButton from '@components/atoms/EditButton';
import FastImage from 'react-native-fast-image';
import PropertyDetailsSkeleton from '@components/molecules/PropertyDetailsSkeleton';

export default function UserOwnedProperty() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const route = useAppRoute();
  const params = route.params;
  const navigation = useAppNavigation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, isLoading } = useGetMyPropertyDetailsQuery(params?.id, {
    skip: isDeleted,
  });

  const [deleteProperty, { isLoading: isDeleting }] =
    useDeletePropertyMutation();

  const handleDeleteConfirm = async () => {
    try {
      await deleteProperty(params?.id).unwrap();
      setIsDeleted(true);
      setShowDeleteModal(false);
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'Property Removed',
        text2: data?.name + 'has been deleted Successfully.',
      });
    } catch (error) {
      console.error('Delete failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Property Not Removed',
        text2: data?.name + 'could not be deleted.',
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
      console.error('Error in the user ownder property edition', e);
    }
  };

  if (isLoading) return <PropertyDetailsSkeleton />;
  console.log(data);
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
            <EditButton onPress={handleClickEdit}></EditButton>
          )}
        </View>

        <View style={dynamicStyles.heroImage}>
          <FastImage
            source={{ uri: data?.imageUrl }}
            style={{ height: '100%', width: '100%' }}
          />
        </View>

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
              {data?.annualYieldPercent}
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
              {data?.availableUnits}
              {'/'}
              {data?.totalUnits}
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

        {data?.status && data?.status !== 2 && data?.status !== 3 && (
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

            {data?.documents.map((doc: any, index: number) => {
              return (
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
                  {/* Document Header */}
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
              );
            })}
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
