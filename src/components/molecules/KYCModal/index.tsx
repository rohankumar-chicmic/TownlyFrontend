import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import Button from '@components/atoms/Button';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';

import { RootState } from '@redux/store';
import { KYC_STATUS } from '@redux/KYCReducer';
import styles from './styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onStartKYC: () => void;
}

export default function KYCStatusModal({
  visible,
  onClose,
  onStartKYC,
}: Readonly<Props>) {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  const { status, rejectionReason } = useSelector(
    (state: RootState) => state.kyc,
  );

  if (status === KYC_STATUS.APPROVED) {
    return null;
  }

  const getTitle = () => {
    switch (status) {
      case KYC_STATUS.PENDING:
        return 'KYC Under Review';
      case KYC_STATUS.NOT_STARTED:
        return 'Complete Your KYC';
      case KYC_STATUS.REJECTED:
        return 'KYC Rejected';
      default:
        return 'KYC Verification';
    }
  };

  const renderBody = () => {
    switch (status) {
      case KYC_STATUS.NOT_STARTED:
        return (
          <>
            <Text style={dynamicStyles.subtitle}>
              Complete your identity verification to unlock investing and
              property creation.
            </Text>

            <View style={dynamicStyles.card}>
              <View style={dynamicStyles.listItem}>
                <Text style={dynamicStyles.bullet}>•</Text>
                <Text style={dynamicStyles.listText}>
                  Facial verification (selfie)
                </Text>
              </View>
              <View style={dynamicStyles.listItem}>
                <Text style={dynamicStyles.bullet}>•</Text>
                <Text style={dynamicStyles.listText}>
                  Takes less than 2 minutes
                </Text>
              </View>
            </View>
          </>
        );

      case KYC_STATUS.PENDING:
        return (
          <View style={dynamicStyles.info}>
            <Text style={dynamicStyles.infoTitle}>
              Your KYC is currently under review.
            </Text>
            <Text style={dynamicStyles.infoSub}>
              You cannot invest or create properties until approval.
            </Text>
          </View>
        );

      case KYC_STATUS.REJECTED:
        return (
          <View style={dynamicStyles.info}>
            <Text style={[dynamicStyles.infoTitle, dynamicStyles.errorText]}>
              Your KYC was rejected.
            </Text>

            <Text style={dynamicStyles.infoSub}>
              {rejectionReason ||
                'Please review your details and submit again.'}
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  const renderFooter = () => {
    switch (status) {
      case KYC_STATUS.NOT_STARTED:
        return (
          <View style={dynamicStyles.footer}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="outline"
              textStyle={{ color: Colors.primary }}
            />
            <Button title="Start KYC" onPress={onStartKYC} />
          </View>
        );

      case KYC_STATUS.REJECTED:
        return (
          <View style={dynamicStyles.footer}>
            <Button
              title="Cancel"
              onPress={onClose}
              variant="outline"
              textStyle={{ color: Colors.primary }}
            />
            <Button title="Retry KYC" onPress={onStartKYC} />
          </View>
        );

      case KYC_STATUS.PENDING:
        return (
          <View style={dynamicStyles.footerSingle}>
            <Button
              title="Close"
              variant="outline"
              onPress={onClose}
              textStyle={{ color: Colors.primary }}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal animationType="slide" transparent visible={visible}>
      {/* Backdrop */}
      <Pressable
        style={dynamicStyles.backdrop}
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Modal Container */}
        <SafeAreaView style={dynamicStyles.sheet}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={dynamicStyles.header}>
              <Text style={dynamicStyles.title}>{getTitle()}</Text>
              <Pressable onPress={onClose} style={{ height: 25, width: 25 }}>
                <Text style={dynamicStyles.close}>✕</Text>
              </Pressable>
            </View>

            {/* Body */}
            {renderBody()}

            {/* Footer */}
            {renderFooter()}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
