import React from 'react';
import { Modal, Pressable } from 'react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  requestClose?: () => void;
  height?: number | string; // e.g. 300 or '50%'
}

export default function BaseModal({
  visible,
  children,
  requestClose,
}: Readonly<ModalProps>) {
  const { dynamicStyles } = useStyles(styles);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={requestClose}
    >
      <Pressable style={[dynamicStyles.backdrop]} onPress={requestClose} />
      <SafeAreaView style={[dynamicStyles.container]}>{children}</SafeAreaView>
    </Modal>
  );
}
