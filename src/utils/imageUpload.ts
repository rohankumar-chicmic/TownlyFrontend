// utils/imageUpload.ts
import { Alert, Platform } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

interface UploadResponse {
  url: string;
  error?: string;
}

export const uploadImage = async (
  type: 'document' | 'selfie'
): Promise<string | null> => {
  try {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8 as const,
      maxWidth: 1920,
      maxHeight: 1920,
    };

    // Show action sheet to choose camera or gallery
    const source = await new Promise<'camera' | 'library' | null>(resolve => {
      Alert.alert(
        `Upload ${type === 'document' ? 'Document' : 'Selfie'}`,
        'Choose an option',
        [
          {
            text: 'Take Photo',
            onPress: () => resolve('camera'),
          },
          {
            text: 'Choose from Gallery',
            onPress: () => resolve('library'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(null),
          },
        ]
      );
    });

    if (!source) return null;

    const result =
      source === 'camera'
        ? await launchCamera(options)
        : await launchImageLibrary(options);

    if (result.didCancel || !result.assets?.[0]) {
      return null;
    }

    const asset = result.assets[0];

    // Upload to your backend
    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'ios' ? asset.uri?.replace('file://', '') : asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || `${type}-${Date.now()}.jpg`,
    } as any);
    formData.append('type', type);

    const response = await fetch(
      `${process.env.API_BASE_URL || 'https://api.yourapp.com'}/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const data: UploadResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    return data.url;
  } catch (error) {
    console.error('Image upload error:', error);
    Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
    return null;
  }
};