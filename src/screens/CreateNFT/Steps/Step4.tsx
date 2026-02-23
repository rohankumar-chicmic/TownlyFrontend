import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import { Icons } from '@utils/icons';
import { NFTFormData } from '../types';
import { viewDocument } from '@react-native-documents/viewer';
import { useMakePropertyMutation } from '@redux/PropertyApiReducer';
import { useAppSelector } from '@redux/store';
import { useAppNavigation } from '@hooks/useNavigation';
import Toast from 'react-native-toast-message';
import { ROUTES } from 'src/navigation/constants';
import { debounce } from '@utils/utility';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: NFTFormData;
}

const InfoRow = ({
  field,
  value,
  style,
}: {
  field: string;
  value: string | ReactElement;
  style?: ViewStyle;
}) => {
  const { Colors } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <Text style={{ color: Colors.textSecondary, width: '40%' }}>{field}</Text>
      <Text
        style={{ color: Colors.textPrimary, width: '60%', textAlign: 'right' }}
      >
        {value || field}
      </Text>
    </View>
  );
};

export default function Step4(props: Readonly<StepProps>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  console.log(props.formData);
  const [makeProperty, { isLoading }] = useMakePropertyMutation();

  const navigation = useAppNavigation();
  const userToken = useAppSelector(state => state.auth.userToken);
  const handleSubmitProperty = debounce(async () => {
    if (!userToken) {
      console.error('No token available!');
      return;
    }

    try {
      const result = await makeProperty({
        data: props.formData,
        token: userToken,
      }).unwrap();

      console.log('Property created successfully!', result);

      navigation.navigate(ROUTES.TABS);

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Your property creation request has been sent successfully',
      });
    } catch (err: any) {
      console.error('Failed to create property:', err);

      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: err.data?.message || 'Sorry, cannot create property.',
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
          <Image
            source={{ uri: props.formData.propertyImage.uri }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 12,
              resizeMode: 'cover',
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
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Text
                style={{
                  color: Colors.textPrimary,
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
                    marginLeft: 6,
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
              {props.formData.totalPropertyValue}
            </Text>
          }
        />
        <InfoRow
          field="Rental Income History (per month)"
          value={
            <Text style={{ fontSize: 18 }}>
              {'$'}
              {props.formData.rentalIncome}
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
            <Text style={{ fontSize: 18, color: Colors.primaryDark }}>
              {props.formData.expectedAnnualYield?.toFixed(1)}
              {'%'}
            </Text>
          }
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Back"
          onPress={() => props.setStep(prev => prev - 1)}
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          textStyle={{ marginHorizontal: 10, color: Colors.primaryDark }}
          variant="outline"
        ></Button>

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
            <Icons.Arrow
              height={15}
              width={15}
              color={Colors.background}
            ></Icons.Arrow>
          )}
        </Button>
      </View>
    </View>
  );
}
