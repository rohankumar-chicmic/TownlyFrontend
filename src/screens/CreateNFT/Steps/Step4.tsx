import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import { Icons } from '@utils/icons';
import { NFTFormData } from '../types';
import { viewDocument } from '@react-native-documents/viewer';
import {
  useMakePropertyMutation,
  useResubmitPropertyMutation,
  useEditPropertyMutation,
} from '@redux/PropertyApiReducer';
import { useAppSelector } from '@redux/store';
import { useAppNavigation } from '@hooks/useNavigation';
import Toast from 'react-native-toast-message';
import { ROUTES } from 'src/navigation/constants';
import { debounce } from '@utils/utility';
import InfoRow from '@components/atoms/InfoRow';
import { useNetInfo } from '@react-native-community/netinfo';
import { addOfflineTask } from 'src/db/functions/common';
import { OfflineTaskType } from '@utils/types';
import FastImage from 'react-native-fast-image';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: NFTFormData;
  propertyId?: string;
  isEdit?: boolean;
  isActiveProperty?: boolean;
  onLoadingChange?: (isLoading: boolean, completed?: boolean) => void;
}

export default function Step4(props: Readonly<StepProps>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const { isConnected } = useNetInfo();

  const [makeProperty, { isLoading: isCreating }] = useMakePropertyMutation();
  const [editProperty, { isLoading: isEditing }] = useEditPropertyMutation();
  const [resubmitProperty, { isLoading: isResubmitting }] =
    useResubmitPropertyMutation();
  const navigation = useAppNavigation();
  const userToken = useAppSelector(state => state.auth.userToken);

  const isLoading = isCreating || isResubmitting || isEditing;

  // Notify parent whenever loading state changes
  useEffect(() => {
    props.onLoadingChange?.(isLoading);
  }, [isLoading]);

  // Block React Navigation back gesture + header back button
  // Block Android hardware back button
  useEffect(() => {
    const unsubscribeNav = navigation.addListener('beforeRemove', e => {
      if (!isLoading) return;
      e.preventDefault();
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isLoading) return true;
        return false;
      },
    );

    return () => {
      unsubscribeNav();
      backHandler.remove();
    };
  }, [navigation, isLoading]);

  const handleSubmitProperty = debounce(async () => {
    if (!userToken) {
      console.error('No token available!');
      Toast.show({
        type: 'error',
        text1: 'No token available!',
      });
      return;
    }

    if (!isConnected) {
      if (!props.isEdit) {
        await addOfflineTask(OfflineTaskType.CREATE_PROPERTY, {
          data: props.formData,
          token: userToken,
        });
      } else if (props.isActiveProperty) {
        await addOfflineTask(OfflineTaskType.EDIT_PROPERTY, {
          propertyId: props.propertyId,
          data: props.formData,
          token: userToken,
        });
      } else {
        await addOfflineTask(OfflineTaskType.RESUBMIT_PROPERTY, {
          propertyId: props.propertyId,
          data: props.formData,
          token: userToken,
        });
      }

      Toast.show({
        type: 'info',
        text1: 'Saved Offline',
        text2: 'Property will be submitted when internet is available',
      });

      props.onLoadingChange?.(false, true);

      return;
    }

    try {
      let result;

      if (props.isEdit && props.isActiveProperty && props.propertyId) {
        result = await editProperty({
          propertyId: props.propertyId,
          data: props.formData,
        }).unwrap();
      } else if (props.isEdit && props.propertyId) {
        result = await resubmitProperty({
          propertyId: props.propertyId,
          data: props.formData,
        }).unwrap();
      } else {
        result = await makeProperty({
          data: props.formData,
          token: userToken,
        }).unwrap();
      }

      console.log('Property submitted successfully!', result);

      setTimeout(() => {
        props.onLoadingChange?.(false, true);
      }, 0);
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: props.isEdit
          ? 'Property update request submitted successfully'
          : 'Property creation request submitted successfully',
      });
    } catch (err: any) {
      console.error('Failed to submit property:', err);

      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: err.data?.message || 'Sorry, cannot submit property.',
      });
    }
  }, 200);

  return (
    <View style={dynamicStyles.containerSurface}>
      <Text style={[dynamicStyles.heading]}>Review & Submit</Text>
      <Text
        style={{
          color: Colors.textSecondary,
          marginBottom: 10,
          paddingVertical: 5,
          fontSize: 12,
        }}
      >
        Review your property information before the NFT
      </Text>

      <View
        style={[
          dynamicStyles.containerSurface,
          {
            backgroundColor: Colors.surface,
            borderColor: Colors.border,
            borderWidth: 1,
          },
        ]}
      >
        {props.formData.propertyImage && (
          <FastImage
            source={{ uri: props.formData.propertyImage.uri }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 12,
              borderBottomWidth: 1,
              borderColor: Colors.border,
            }}
          />
        )}
      </View>
      <View
        style={[
          dynamicStyles.containerSurface,
          {
            backgroundColor: Colors.surface,
            borderColor: Colors.border,
            borderWidth: 1,
            marginVertical: 10,
          },
        ]}
      >
        <InfoRow field={'Property Name'} value={props.formData.propertyName} />
        <InfoRow field={'Location'} value={props.formData.location} />
        <InfoRow field={'Property Type'} value={props.formData.propertyType} />
        <View
          style={[
            {
              paddingVertical: 10,
              justifyContent: 'space-between',
            },
          ]}
        >
          <Text style={{ color: Colors.textSecondary }}>Description</Text>
          <Text
            style={{
              color: Colors.textPrimary,
            }}
          >
            {props.formData.description || 'Description'}
          </Text>
        </View>
        <View
          style={[
            {
              paddingVertical: 10,
              justifyContent: 'space-between',
            },
          ]}
        >
          <Text style={{ color: Colors.textSecondary }}>Documents</Text>
          {props.formData.documents?.map((document, index) => (
            <View
              key={document.documentName}
              style={{
                flexDirection: 'row',
                width: '98%',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                overflow: 'hidden',
              }}
            >
              <Text
                style={{
                  color: Colors.textPrimary,
                  width: '38%',
                }}
              >
                {document.documentName || 'Document Name'}
              </Text>
              <Pressable
                style={{
                  width: '60%',
                }}
                onPress={() => viewDocument({ uri: document.file?.uri ?? '' })}
              >
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 13,
                    textAlign: 'right',
                    fontWeight: '600',
                  }}
                >
                  {document.file?.name}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      <View
        style={[
          dynamicStyles.containerSurface,
          {
            backgroundColor: Colors.surface,
            borderColor: Colors.border,
            borderWidth: 1,
          },
        ]}
      >
        <InfoRow
          field="Total Property Value"
          value={
            <Text style={{ fontSize: 18 }}>
              {'$'}
              {props.formData.totalPropertyValue.toLocaleString()}
            </Text>
          }
        />
        <InfoRow
          field="Rental Income History (per month)"
          value={
            <Text style={{ fontSize: 18 }}>
              {'$'}
              {props.formData.rentalIncome.toLocaleString()}
            </Text>
          }
        />
        <InfoRow
          field="Number of Shares"
          value={
            <Text style={{ fontSize: 18 }}>
              {props.formData.numberOfShares.toLocaleString()}
            </Text>
          }
        />
        <InfoRow
          field="Price Per Share"
          value={
            <Text style={{ fontSize: 18, color: Colors.primary }}>
              {'$'}
              {props.formData.pricePerUnit.toFixed(3) || 0}
            </Text>
          }
        />
        <InfoRow
          field="Expected Annual Yield"
          value={
            <Text style={{ fontSize: 18, color: Colors.success }}>
              {props.formData.expectedAnnualYield?.toFixed(1)}
              {'%'}
            </Text>
          }
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 2,
        }}
      >
        <Button
          title="Back"
          disabled={isLoading}
          onPress={() => props.setStep(prev => prev - 1)}
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          textStyle={{ marginHorizontal: 10, color: Colors.primary }}
          variant="outline"
        />

        <Button
          title={isLoading ? 'Submitting' : 'Submit'}
          disabled={isLoading}
          onPress={handleSubmitProperty}
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          textStyle={{ marginHorizontal: 10 }}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Icons.Arrow height={15} width={15} color={Colors.background} />
          )}
        </Button>
      </View>
    </View>
  );
}
