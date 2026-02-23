import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import Button from '@components/atoms/Button';
import styles from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function DeletePropertyModal({
  visible,
  onClose,
  onConfirm,
  isLoading,
}: Readonly<Props>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <Pressable
        style={dynamicStyles.backdrop}
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      />
      <SafeAreaView style={dynamicStyles.sheet}>
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.title}>Delete Property</Text>
          <Pressable onPress={onClose} style={{ height: 25, width: 25 }}>
            <Text style={dynamicStyles.close}>✕</Text>
          </Pressable>
        </View>

        <Text
          style={{
            color: Colors.textSecondary,
            fontSize: 14,
            marginTop: 10,
            marginBottom: 24,
            lineHeight: 20,
          }}
        >
          Are you sure you want to delete this property? This action cannot be
          undone and all associated data will be permanently removed.
        </Text>

        <View style={dynamicStyles.footer}>
          <Button
            title="Cancel"
            onPress={onClose}
            variant="outline"
            textStyle={{ color: Colors.primary }}
          />
          <Button
            title={isLoading ? 'Deleting...' : 'Delete'}
            onPress={onConfirm}
            disabled={isLoading}
            style={{ backgroundColor: Colors.warning }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}