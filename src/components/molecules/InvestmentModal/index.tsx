import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import Button from '@components/atoms/Button';
import useTheme from '@hooks/useTheme';
import { useInvestInPropertyMutation } from '@redux/PropertyApiReducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAppNavigation } from '@hooks/useNavigation';
import Toast from 'react-native-toast-message';
import { ROUTES } from 'src/navigation/constants';
import { useAppToastConfig } from '@hooks/useAppToastConfig';
interface Props {
  visible: boolean;
  onClose: () => void;
  id: string;
  pricePerShare: number;
  availableUnits: number;
}

export default function InvestPropertyModal({
  visible,
  onClose,
  id,
  pricePerShare,
  availableUnits,
}: Readonly<Props>) {
  const MAX_LIMIT = Math.min(10000, availableUnits);
  const MIN_LIMIT = 1;
  const [shares, setShares] = useState('');
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const totalCost = Number(shares || 0) * pricePerShare;
  const [investInProperty] = useInvestInPropertyMutation();
  const toastConfig = useAppToastConfig();
  const { dynamicStyles } = useStyles(styles);

  const handleSubmit = async () => {
    const sharesNum = Number(shares);

    if (sharesNum < MIN_LIMIT) {
      Toast.show({
        type: 'error',
        text1: 'Minimum 1 share required',
        visibilityTime: 1000,
      });
      return;
    }

    try {
      await investInProperty({ propertyId: id, shares: sharesNum });
      onClose();
      navigation.navigate(ROUTES.TRANSACTIONS);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <KeyboardAwareScrollView>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        style={{ flexGrow: 1 }}
      >
        <Pressable
          style={dynamicStyles.backdrop}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
        />
        <SafeAreaView style={dynamicStyles.sheet}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={dynamicStyles.header}>
              <Text style={dynamicStyles.title}>Invest in Property</Text>
              <Pressable onPress={onClose} style={{ height: 25, width: 25 }}>
                <Text style={dynamicStyles.close}>✕</Text>
              </Pressable>
            </View>

            <Text style={dynamicStyles.label}>
              Number of Shares to Buy{' '}
              <Text style={dynamicStyles.required}>*</Text>
            </Text>

            <TextInput
              value={shares}
              onChangeText={handleSharesChange}
              keyboardType="number-pad"
              placeholderTextColor={Colors.textMuted}
              style={dynamicStyles.input}
              cursorColor={Colors.outline}
              placeholder="0"
            />

            <Text style={dynamicStyles.hint}>
              Min: 1 • Max: {MAX_LIMIT} shares
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

            <View style={dynamicStyles.info}>
              <Text style={dynamicStyles.infoText}>
                Transaction Fee: ~0.05 ETH
              </Text>
              <Text style={dynamicStyles.infoSub}>
                You will receive an Investment NFT representing your 1 share
              </Text>
            </View>

            <View style={dynamicStyles.footer}>
              <Button
                title="Cancel"
                onPress={onClose}
                variant="outline"
                textStyle={{ color: Colors.primary }}
              ></Button>

              <Button
                title={`Invest ${totalCost.toFixed(3)} ETH`}
                onPress={handleSubmit}
              ></Button>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Toast config={toastConfig} />
      </Modal>
    </KeyboardAwareScrollView>
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
