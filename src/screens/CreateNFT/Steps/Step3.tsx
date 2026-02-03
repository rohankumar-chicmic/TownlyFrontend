import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { Icons } from '@utils/icons';
import {
  DocumentPickerResponse,
  pick,
  types,
} from '@react-native-documents/picker';

interface stepProps {
  setStep: Dispatch<SetStateAction<number>>;
  formData: any;
  setFormData: () => void;
}

const handlePickFile = async () => {
  const [pickedFile, setPickedFile] = useState<DocumentPickerResponse | null>(
    null,
  );
  try {
    const [pickResult] = await pick({ type: [types.pdf, types.docx] });
    setPickedFile(pickResult);
  } catch (err: unknown) {
    console.log(err);
  }
};

export default function Step3(props: stepProps) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={dynamicStyles.containerSurface}>
      <Text style={[dynamicStyles.heading]}>Property Image</Text>
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

      <View style={{ flex: 1, marginTop: 6 }}>
        <Text style={dynamicStyles.label}>
          Upload Image <Text style={{ color: Colors.primary }}> *</Text>
        </Text>
        <Button style={dynamicStyles.input} onPress={handlePickFile}>
          <Text
            style={{
              color: Colors.textMuted,
              fontSize: 13,
            }}
          >
            Select Image
          </Text>
        </Button>
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
          title="Continue"
          onPress={() => props.setStep(prev => prev + 1)}
          style={{ alignSelf: 'flex-end', marginTop: 10 }}
          textStyle={{ marginHorizontal: 10 }}
        >
          <Icons.Arrow
            height={15}
            width={15}
            borderColor={Colors.background}
          ></Icons.Arrow>
        </Button>
      </View>
    </View>
  );
}
function useState<T>(): [any, any] {
  throw new Error('Function not implemented.');
}
