import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '@components/atoms/Button';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import { useAppNavigation } from '@hooks/useNavigation';
import useStyles from '@hooks/useStyles';
import KYCStatusModal from '@components/molecules/KYCModal';

export default function KYCpendingPortfolio() {
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);
  const navigation = useAppNavigation();
  const [modalOpened, setModalOpened] = useState(false);

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
        title="Check KYC"
        onPress={() => setModalOpened(true)}
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
