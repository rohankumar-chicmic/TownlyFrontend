import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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

interface Props {
  visible: boolean;
  onClose: () => void;
  id: string;
  pricePerShare: number;
}

export default function InvestPropertyModal({
  visible,
  onClose,
  id,
  pricePerShare,
}: Readonly<Props>) {
  const [shares, setShares] = useState(0);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const totalCost = Number(shares || 0) * pricePerShare;
  const [investInProperty, { isError, isSuccess }] =
    useInvestInPropertyMutation();

  const { dynamicStyles } = useStyles(styles);

  const handleSubmit = async () => {
    try {
      await investInProperty({ propertyId: id, shares: Number(shares) });
      navigation.navigate('Drawer');
    } catch (error) {
      console.error(error);
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
              onChangeText={setShares}
              keyboardType="numeric"
              style={dynamicStyles.input}
            />

            <Text style={dynamicStyles.hint}>Min: 1 • Max: 10,000 shares</Text>

            <View style={dynamicStyles.card}>
              <Row label="Shares" value={shares} />
              <Row label="Price per Share" value={`${pricePerShare} ETH`} />
              <View style={dynamicStyles.divider} />
              <Row label="Total Cost" value={`${totalCost} ETH`} bold large />
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
                title={`Invest ${totalCost} ETH`}
                onPress={handleSubmit}
              ></Button>
            </View>
          </ScrollView>
        </SafeAreaView>
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
