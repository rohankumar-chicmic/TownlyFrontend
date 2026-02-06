import { useCallback, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useSendFCMTokenMutation } from '@redux/NotificationsApiReducer';
import { useAppSelector } from '@redux/store';

async function requestUserPermission() {
  let enabled = false;
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } else {
    const authStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    enabled = authStatus === 'granted';
  }
  if (enabled) {
    const token = await messaging().getToken();
    return token;
  }
  return '';
}

const useNotification = () => {
  const userToken = useAppSelector(state => state.auth.userToken);
  const [sendFCMToken] = useSendFCMTokenMutation();

  const handleSendToken = useCallback(async (token: string) => {
    try {
      if (!token || !userToken) return;
      const platform = Platform.OS === 'android' ? 'Android' : 'IOS';
      await sendFCMToken({ deviceToken: token, platform });
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!userToken) return;
    requestUserPermission()
      .then(handleSendToken)
      .catch(error => {
        console.log('error occurred', error);
      });

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
    });

    return unsubscribeForeground;
  }, [handleSendToken, userToken]);
};

export default useNotification;
