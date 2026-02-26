import React, { ReactElement, useCallback, useState } from 'react';
import {
  View,
  Text,
  ViewStyle,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@components/atoms/BackButton';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
  useGetBalanceQuery,
  useRequestCurrencyMutation,
} from '@redux/ApiReducer';
import { useAppSelector } from '@redux/store';
import Button from '@components/atoms/Button';
import FormInput from '@components/atoms/FormInput';
import { useFocusEffect } from '@react-navigation/native';
import { useAppKit } from '@reown/appkit-react-native';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import Toast from 'react-native-toast-message';

const InfoRow = ({
  field,
  value,
  style,
}: {
  field: string;
  value: string | ReactElement;
  style?: ViewStyle;
}) => {
  const { Colors } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <Text style={{ color: Colors.textSecondary, width: '40%' }}>{field}</Text>
      <Text
        style={{ color: Colors.textPrimary, width: '60%', textAlign: 'right' }}
      >
        {value || field}
      </Text>
    </View>
  );
};

export default function WalletScreen() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [amount, setAmount] = useState('');
  const walletAddress = useAppSelector(
    state => state.auth.userData?.walletAddress,
  );
  const userToken = useAppSelector(state => state.auth.userToken);
  const { data, refetch } = useGetBalanceQuery(undefined, {
    skip: !userToken,
  });
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const { disconnect } = useAppKit();
  const navigation = useAppNavigation();
  const [inputError, setInputError] = useState('');
  const [requestCurrency, { isSuccess }] = useRequestCurrencyMutation();

  const handleRequestCurrency = async (rawAmount: string) => {
    try {
      if (!rawAmount) return;
      const cleaned = rawAmount.replaceAll(',', '').trim();
      const num = Number(cleaned);

      if (Number.isNaN(num)) {
        setInputError('Invalid number');
        return;
      }
      if (num < 1 || num > 999) {
        setInputError('Amount must be between 1 and 999');
        return;
      }
      await requestCurrency(rawAmount.toString());
      setInputError('');
      setAmount('');

      Toast.show({
        type: 'info',
        text1: 'request sent to admin',
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleDisconnect = async () => {
    try {
      disconnect();
      navigation.navigate(ROUTES.TABS);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Cannot disconnect at the moment',
      });
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const refreshBalance = async () => {
        try {
          await refetch();
        } catch (error) {
          console.log(error);
        }
      };
      refreshBalance();
    }, [refetch]),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.background }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[dynamicStyles.container, { flexGrow: 1 }]}>
          <View style={{ justifyContent: 'center', alignItems: 'stretch' }}>
            <View style={{ marginLeft: -10, justifyContent: 'center' }}>
              <BackButton />
              <Text
                style={[dynamicStyles.heroPrimarytext, { alignSelf: 'center' }]}
              >
                Account Details
              </Text>
            </View>
          </View>

          <View
            style={[
              dynamicStyles.containerSurface,
              {
                backgroundColor: Colors.surface,
                borderColor: Colors.border,
                borderWidth: 1,
                marginVertical: 10,
                padding: 15,
                borderRadius: 10,
              },
            ]}
          >
            <InfoRow field="Wallet Address" value={walletAddress ?? 0} />
            <InfoRow field="Total granted" value={data?.totalGranted ?? 0} />
            <InfoRow field="Total used" value={data?.totalUsed ?? 0} />
            <InfoRow field="Available Balance" value={data?.available ?? 0} />
          </View>
          <View
            style={[
              dynamicStyles.containerSurface,
              {
                backgroundColor: Colors.surface,
                borderColor: Colors.border,
                borderWidth: 1,
                marginVertical: 10,
                padding: 15,
                borderRadius: 10,
                gap: 10,
              },
            ]}
          >
            <Text
              style={{
                color: Colors.textPrimary,
                fontSize: 25,
                marginHorizontal: 5,
              }}
            >
              Request currency
            </Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}
            >
              <View style={{ flex: 1 }}>
                <FormInput
                  placeholder="Amount to request"
                  keyboardType="number-pad"
                  value={amount}
                  onChangeText={setAmount}
                  error={inputError}
                ></FormInput>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  style={{ marginBottom: 10, height: 38 }}
                  size="sm"
                  disabled={isSuccess}
                  title={isSuccess ? 'Request sent' : 'Request Currency'}
                  onPress={() => {
                    handleRequestCurrency(amount);
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              dynamicStyles.containerSurface,
              {
                backgroundColor: Colors.surface,
                borderColor: Colors.border,
                borderWidth: 1,
                marginVertical: 10,
                padding: 15,
                borderRadius: 10,
                gap: 10,
              },
            ]}
          >
            <Button
              variant="outline"
              textStyle={{ color: Colors.primary }}
              title="Disconnect"
              onPress={() => setShowDisconnectModal(true)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Modal animationType="slide" transparent visible={showDisconnectModal}>
        <Pressable
          style={[dynamicStyles.backdrop]}
          onPress={() => setShowDisconnectModal(false)}
        />
        <SafeAreaView style={[dynamicStyles.container]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={dynamicStyles.header}>
              <Text style={dynamicStyles.title}>Confirm Disconnect</Text>
              <Text style={dynamicStyles.subtitle}>
                Your wallet will be disconnected on Confirmation.
              </Text>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setShowDisconnectModal(false)}
                textStyle={{ color: Colors.primary }}
              ></Button>
              <Button title="Disconnect" onPress={handleDisconnect}></Button>
              {/* <Button title="Disconnect" onPress={disconnect}></Button> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
