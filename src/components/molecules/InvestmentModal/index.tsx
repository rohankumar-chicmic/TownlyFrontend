import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import Button from '@components/atoms/Button';
import useTheme from '@hooks/useTheme';
import { useInvestInPropertyMutation } from '@redux/PropertyApiReducer';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'; // ← from keyboard-controller, not RN
import Toast from 'react-native-toast-message';
import { useAppToastConfig } from '@hooks/useAppToastConfig';
import { useAppSelector } from '@redux/store';
import { useGetBalanceQuery } from '@redux/ApiReducer';
import { useNetInfo } from '@react-native-community/netinfo';

interface Props {
  visible: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  id: string;
  name: string;
  pricePerShare: number;
  availableUnits: number;
}

export default function InvestPropertyModal({
  visible,
  onClose,
  id,
  name,
  pricePerShare,
  availableUnits,
  handleSubmit,
}: Readonly<Props>) {
  const MAX_LIMIT = Math.min(10000, availableUnits);
  const MIN_LIMIT = 1;

  const [shares, setShares] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const toastConfig = useAppToastConfig();
  const { isConnected } = useNetInfo();
  const [investInProperty] = useInvestInPropertyMutation();
  const userToken = useAppSelector(state => state.auth.userToken);
  const { data: balanceData } = useGetBalanceQuery(undefined, {
    skip: !userToken,
  });

  const availableBalance = balanceData?.available ?? 0;
  const totalCost = Number(shares || 0) * pricePerShare;
  const gasEstimate = 0.05;

  useEffect(() => {
    if (!visible) {
      setShares('');
      setLoading(false);
      setShowConfirmModal(false);
    }
  }, [visible]);

  const handleSharesChange = (value: string) => {
    let cleanValue = value.replaceAll(/\D/g, '');

    if (cleanValue.length > 1 && cleanValue.startsWith('0')) {
      cleanValue = Number(cleanValue).toString();
    }

    const numericValue = Number(cleanValue);

    if (numericValue > MAX_LIMIT) {
      Toast.show({
        type: 'error',
        text1: 'Max Limit Reached',
        text2: 'Cannot buy more than maximum shares',
        visibilityTime: 1000,
      });
      setShares(MAX_LIMIT.toString());
    } else {
      setShares(cleanValue);
    }
  };

  const handleProceedToConfirm = () => {
    const sharesNum = Number(shares);
    Keyboard.dismiss();

    if (sharesNum < MIN_LIMIT) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 1 share required',
        visibilityTime: 1000,
      });
      return;
    }

    if (totalCost + gasEstimate > availableBalance) {
      Toast.show({
        type: 'error',
        text1: 'Insufficient Balance',
        text2: `You need ${(totalCost + gasEstimate).toFixed(3)} ETH but only have ${availableBalance.toFixed(3)} ETH`,
        visibilityTime: 2000,
      });
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmInvestment = async () => {
    try {
      setLoading(true);

      await investInProperty({
        propertyId: id,
        shares: Number(shares),
      }).unwrap();

      handleSubmit();
      setShowConfirmModal(false);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Investment Failed',
        text2: isConnected
          ? `Something went wrong: ${error?.message ?? ''}`
          : 'No internet connection',
        visibilityTime: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal animationType="slide" transparent visible={visible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()} />

          <SafeAreaView style={dynamicStyles.sheet}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={dynamicStyles.header}>
                <Text style={dynamicStyles.title}>Invest in Property</Text>
                <Pressable onPress={onClose} hitSlop={8}>
                  <Text style={dynamicStyles.close}>✕</Text>
                </Pressable>
              </View>

              <Text style={dynamicStyles.propertyName}>{name}</Text>

              <Text style={dynamicStyles.label}>
                Number of Shares to Buy{' '}
                <Text style={dynamicStyles.required}>*</Text>
              </Text>

              <TextInput
                value={shares}
                onChangeText={handleSharesChange}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor={Colors.textMuted}
                style={dynamicStyles.input}
                cursorColor={Colors.primary}
              />

              <Text style={dynamicStyles.hint}>
                Min: 1 • Max: {MAX_LIMIT} shares
              </Text>

              <View style={dynamicStyles.card}>
                <Row label="Shares" value={shares || 0} />
                <Row label="Price per Share" value={`${pricePerShare} ETH`} />
                <View style={dynamicStyles.divider} />
                <Row
                  label="Total Cost"
                  value={`${totalCost.toFixed(3)} ETH`}
                  bold
                  large
                />
              </View>

              <View style={dynamicStyles.info}>
                <Text style={dynamicStyles.infoText}>
                  Transaction Fee: ~0.05 ETH
                </Text>
                <Text style={dynamicStyles.infoSub}>
                  You will receive an Investment NFT representing your share.
                </Text>
              </View>

              <View style={dynamicStyles.footer}>
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={onClose}
                  textStyle={{ color: Colors.primary }}
                />
                <Button
                  title={`Invest ${totalCost.toFixed(3)} ETH`}
                  onPress={handleProceedToConfirm}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>

        <Toast config={toastConfig} />
      </Modal>

      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={dynamicStyles.centerOverlay}>
          <View style={dynamicStyles.centerModal}>
            <Text style={dynamicStyles.centerTitle}>Confirm Investment</Text>
            <Text style={dynamicStyles.centerText}>
              Please confirm your investment details.
            </Text>

            <View style={dynamicStyles.card}>
              <Row label="Shares" value={shares} />
              <Row label="Price per Share" value={`${pricePerShare} ETH`} />
              <View style={dynamicStyles.divider} />
              <Row
                label="Total Cost"
                value={`${totalCost.toFixed(3)} ETH`}
                bold
                large
              />
            </View>

            <View style={dynamicStyles.modalButtonRow}>
              <Button
                onPress={() => setShowConfirmModal(false)}
                title="Cancel"
                variant="outline"
                disabled={loading}
                textStyle={{ color: Colors.primary }}
              />
              <Button
                onPress={handleConfirmInvestment}
                disabled={loading}
                title={loading ? 'Submitting' : 'Confirm'}
              />
            </View>
          </View>
        </View>
        <Toast config={toastConfig} />
      </Modal>
    </>
  );
}

function Row({
  label,
  value,
  bold,
  large,
}: Readonly<{
  label: string;
  value: string | number;
  bold?: boolean;
  large?: boolean;
}>) {
  const { dynamicStyles } = useStyles(styles);

  return (
    <View style={dynamicStyles.row}>
      <Text style={dynamicStyles.rowLabel}>{label}</Text>
      <Text
        style={[
          dynamicStyles.rowValue,
          bold && dynamicStyles.bold,
          large && dynamicStyles.large,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}
