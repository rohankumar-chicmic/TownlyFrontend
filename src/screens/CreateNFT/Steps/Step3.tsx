import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import { Icons } from '@utils/icons';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';
import { NFTFormData } from '../types';

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: NFTFormData;
  setFormData: Dispatch<SetStateAction<NFTFormData>>;
}

export default function Step3({
  setStep,
  setFormData,
  formData,
}: Readonly<StepProps>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  const [pickedImage, setPickedImage] = useState<DocumentPickerResponse | null>(
    null,
  );

  useEffect(() => {
    if (formData.propertyImage) {
      setPickedImage({
        uri: formData.propertyImage.uri,
        name: formData.propertyImage.name,
        type: formData.propertyImage.type,
        size: formData.propertyImage.size,
      } as DocumentPickerResponse);
    }
  }, [formData, setPickedImage]);

  const handlePickImage = async () => {
    try {
      const [result] = await pick({ type: [types.images] });
      if (!result?.uri) return;

      setPickedImage(result);

      setFormData(prev => ({
        ...prev,
        propertyImage: {
          uri: result.uri,
          name: result.name ?? 'property-image',
          type: result.type ?? 'image/jpeg',
          size: result.size ?? 0,
        },
      }));
    } catch (err) {
      console.log('Image pick cancelled or failed', err);
    }
  };

  return (
    <View style={dynamicStyles.containerSurface}>
      <Text style={dynamicStyles.heading}>Property Image</Text>

      <Text
        style={{
          color: Colors.textSecondary,
          marginBottom: 10,
          paddingVertical: 5,
          fontSize: 12,
        }}
      >
        Add a high-quality image to showcase your property
      </Text>

      <View style={{ marginTop: 6 }}>
        <Text style={dynamicStyles.label}>
          Upload Image <Text style={{ color: Colors.primary }}> *</Text>
        </Text>

        <Button style={dynamicStyles.input} onPress={handlePickImage}>
          <Text
            style={{
              color: pickedImage ? Colors.primary : Colors.textMuted,
              fontSize: 13,
            }}
          >
            {pickedImage ? pickedImage.name : 'Select Image'}
          </Text>
        </Button>
      </View>

      {pickedImage && (
        <View style={{ marginBottom: 20 }}>
          <Image
            source={{ uri: pickedImage.uri }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 12,
              resizeMode: 'cover',
            }}
          />
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Back"
          onPress={() => setStep(prev => prev - 1)}
          variant="outline"
          textStyle={{ marginHorizontal: 10, color: Colors.primary }}
        />

        <Button
          title="Continue"
          onPress={() => setStep(prev => prev + 1)}
          disabled={!pickedImage}
        >
          <Icons.Arrow height={15} width={15} borderColor={Colors.background} />
        </Button>
      </View>
    </View>
  );
}
