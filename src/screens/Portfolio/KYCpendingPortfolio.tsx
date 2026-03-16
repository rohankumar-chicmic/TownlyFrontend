import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '@components/atoms/Button';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import { useAppNavigation } from '@hooks/useNavigation';
import useStyles from '@hooks/useStyles';
import KYCStatusModal from '@components/molecules/KYCModal';
import { useGetKYCStatusQuery } from '@redux/KYCApiReducer';
import { KYC_STATUS } from '@redux/KYCReducer';
import { useAppSelector } from '@redux/store';
import Toast from 'react-native-toast-message';

export default function KYCpendingPortfolio() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const navigation = useAppNavigation();
  const [modalOpened, setModalOpened] = useState(false);
  const userToken = useAppSelector(state => state.auth.userToken);
  const { data, refetch } = useGetKYCStatusQuery(undefined, {
    skip: !userToken,
  });
  const [checking, setChecking] = useState(false);

  const handleCheckKyc = async () => {
    try {
      setChecking(true);

      const result = await refetch();
      const kycStatus = result?.data?.status;

      if (kycStatus !== KYC_STATUS.APPROVED) {
        setModalOpened(true);
      }
    }catch(e){
      Toast.show({
        type: 'error', 
        text1: 'Something went wrong',
        text2 : '' + e,
      })
      console.log(e)
    }
  
    finally {
      setChecking(false);
    }
  };

  return (
    <View
      style={[
        dynamicStyles.container,
        {
          backgroundColor: Colors.background,
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        },
      ]}
    >
      <Text
        style={[
          dynamicStyles.heading,
          { color: Colors.textPrimary, fontSize: 25, fontWeight: '600' },
        ]}
      >
        KYC is not completed.
      </Text>

      <Text style={[dynamicStyles.heroText, { textAlign: 'center' }]}>
        Your wallet is connected, but identity verification is required to
        access your investor portfolio, track investments, and manage
        properties.
      </Text>

      <Button
        title={checking ? 'Checking...' : 'Check KYC'}
        disabled={checking}
        onPress={handleCheckKyc}
        style={{ marginTop: 20, width: '70%' }}
      />
      <KYCStatusModal
        visible={modalOpened}
        onStartKYC={() => {
          setModalOpened(false);
          navigation.navigate('KycScreen');
        }}
        onClose={() => setModalOpened(false)}
      />
    </View>
  );
}
