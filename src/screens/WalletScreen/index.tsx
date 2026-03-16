import React, { ReactElement, useCallback, useEffect, useState } from 'react';
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
import {
  saveAccountBalance,
  useAccountBalance,
} from 'src/db/hooks/useWalletScreenData';
import { addOfflineTask } from 'src/db/functions/common';
import { useNetInfo } from '@react-native-community/netinfo';
import { OfflineTaskType } from '@utils/types';

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
  const { isConnected } = useNetInfo();

  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [amount, setAmount] = useState('');
  const walletAddress = useAppSelector(
    state => state.auth.userData?.walletAddress,
  );
  const userToken = useAppSelector(state => state.auth.userToken);
  const { data, refetch } = useGetBalanceQuery(undefined, {
    skip: !userToken || !isConnected,
  });
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const { disconnect } = useAppKit();
  const navigation = useAppNavigation();
  const [inputError, setInputError] = useState('');
  const [requestCurrency] = useRequestCurrencyMutation();
  const { data: balance } = useAccountBalance(walletAddress);
  const [isTemporarilyDisabled, setIsTemporarilyDisabled] = useState(false);

  const validateAmount = (value: string): number | null => {
    if (!value || value.trim() === '') {
      setInputError('Amount is required');
      return null;
    }

    const cleaned = value.replaceAll(',', '').trim();
    const num = Number(cleaned);

    if (Number.isNaN(num)) {
      setInputError('Amount must be a valid number');
      return null;
    }

    if (num < 1 || num > 999) {
      setInputError('Amount must be between 1 and 999');
      return null;
    }

    setInputError('');
    return num;
  };

  const handleRequestCurrency = async (rawAmount: string) => {
    try {
      const validatedAmount = validateAmount(rawAmount);

      if (validatedAmount === null) return;

      const amountString = validatedAmount.toString();

      setIsTemporarilyDisabled(true);

      if (!isConnected) {
        await addOfflineTask(OfflineTaskType.REQUEST_TOKEN, {
          tokens: amountString,
        });

        Toast.show({
          type: 'info',
          text1: 'Saved Offline',
          text2: 'Request will be sent when internet returns',
        });

        setAmount('');
        return;
      }

      await requestCurrency(amountString);

      setAmount('');

      Toast.show({
        type: 'success',
        text1: 'Request Successful',
        text2: `Request of ${amountString} dummy tokens sent to admin`,
      });
    } catch (e) {
      console.log(e);

      Toast.show({
        type: 'error',
        text1: 'Request Failed',
        text2: 'Sorry, your request could not be completed.',
      });
    } finally {
      setTimeout(() => {
        setIsTemporarilyDisabled(false);
      }, 2000);
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

  useEffect(() => {
    if (!data || !walletAddress) return;

    saveAccountBalance({
      walletAddress,
      totalGranted: data.totalGranted,
      totalUsed: data.totalUsed,
      available: data.available,
    });
  }, [data, walletAddress]);

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

  const displayData = {
    walletAddress: walletAddress ?? 'N/A',
    totalGranted: balance?.totalGranted ?? 0,
    totalUsed: balance?.totalUsed ?? 0,
    available: balance?.availableBalance ?? 0,
  };

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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}
            >
              <BackButton
                style={{ left: 0, position: 'absolute', zIndex: 100 }}
              />
              <Text
                style={[
                  dynamicStyles.heroPrimarytext,
                  {
                    textAlign: 'center',
                    flex: 1,
                  },
                ]}
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
            <InfoRow field="Wallet Address" value={displayData.walletAddress} />
            <InfoRow
              field="Total granted"
              value={displayData.totalGranted.toString()}
            />
            <InfoRow
              field="Total used"
              value={displayData.totalUsed.toString()}
            />
            <InfoRow
              field="Available Balance"
              value={displayData.available.toString()}
            />
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
            <Text
              style={{
                color: Colors.textPrimary,
                fontSize: 25,
                marginHorizontal: 5,
              }}
            >
              Request currency
            </Text>
            <View>
              <FormInput
                placeholder="Amount to request"
                keyboardType="number-pad"
                maxLength={3}
                value={amount}
                onChangeText={setAmount}
                hintText="Min: 1 - Max: 999"
                error={inputError}
              ></FormInput>
            </View>
            <Button
              style={{ margin: 10, height: 38 }}
              size="sm"
              disabled={isTemporarilyDisabled}
              title={
                isTemporarilyDisabled ? 'Request sent' : 'Request Currency'
              }
              onPress={() => handleRequestCurrency(amount)}
            />
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
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Pressable
            style={dynamicStyles.backdrop}
            onPress={() => setShowDisconnectModal(false)}
          />
          <SafeAreaView
            style={[
              dynamicStyles.sheet,
              {
                backgroundColor: Colors.surface,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderWidth: 1,
                borderColor: Colors.border,
                padding: 20,
              },
            ]}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={dynamicStyles.header}>
                <Text style={dynamicStyles.title}>Confirm Disconnect</Text>

                <Text style={dynamicStyles.subtitle}>
                  Your wallet will be disconnected on confirmation.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={() => setShowDisconnectModal(false)}
                  textStyle={{ color: Colors.primary }}
                />

                <Button
                  title="Disconnect"
                  onPress={handleDisconnect}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
