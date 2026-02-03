import { launchCamera } from 'react-native-image-picker';

export const uploadImage = async (type: 'selfie') => {
  const result = await launchCamera({
    mediaType: 'photo',
    cameraType: 'front',
    quality: 0.8,
  });

  if (result.didCancel || !result.assets?.[0]?.uri) {
    return null;
  }

  // ✅ IMPORTANT: return LOCAL uri ONLY
  return result.assets[0].uri;
};
