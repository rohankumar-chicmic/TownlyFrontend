import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import Button from '@components/atoms/Button';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading,
  onConfirm,
  onCancel,
}: Readonly<ConfirmModalProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={dynamicStyles.backdrop} onPress={onCancel}>
        <View style={[dynamicStyles.container, {backgroundColor: Colors.surface}]}>
          <Text style={dynamicStyles.title}>{title}</Text>

          {description && (
            <Text style={dynamicStyles.description}>
              {description}
            </Text>
          )}

          <View style={dynamicStyles.actions}>
            <Button
              title={cancelText}
              variant="outline"
              onPress={onCancel}
            />

            <Button
              title={confirmText}
              loading={loading}
              onPress={onConfirm}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
