import { useCallback, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useSendFCMTokenMutation } from '@redux/NotificationsApiReducer';
import store, { useAppSelector } from '@redux/store';
import handleNotification from '@utils/handleNotification';
import { hasUnreadNotifications } from '@redux/AuthReducer';

async function requestUserPermission() {
  let enabled = false;

  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } else {
    const isAndroid13Plus =
      Platform.OS === 'android' &&
      typeof Platform.Version === 'number' &&
      Platform.Version >= 33;

    if (isAndroid13Plus) {
      const authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      enabled = authStatus === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      enabled = true;
    }
  }

  if (!enabled) return '';

  return await messaging().getToken();
}

const useNotification = () => {
  const userToken = useAppSelector(state => state.auth.userToken);
  const [sendFCMToken] = useSendFCMTokenMutation();

  /**
   * Send FCM token to backend
   */
  const handleSendToken = useCallback(
    async (token: string) => {
      try {
        if (!token || !userToken) return;

        const platform = Platform.OS === 'android' ? 'Android' : 'IOS';

        await sendFCMToken({ deviceToken: token, platform });
      } catch (error) {
        console.error('FCM token send failed:', error);
      }
    },
    [userToken, sendFCMToken],
  );

  useEffect(() => {
    if (!userToken) return;

    /**
     * Request permission + send token
     */
    requestUserPermission()
      .then(handleSendToken)
      .catch(err => console.error('Permission error:', err));

    /**
     * Foreground notification
     */
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
      store.dispatch(hasUnreadNotifications(true));
    });

    /**
     * App opened from BACKGROUND by tapping notification
     */
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        if (remoteMessage?.data) {
          console.log('Opened from background:', remoteMessage);
          handleNotification(remoteMessage.data);
        }
      },
    );

    /**
     * App opened from QUIT state
     */
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data) {
          console.log('Opened from quit:', remoteMessage);
          handleNotification(remoteMessage.data);
        }
      });

    /**
     * Token refresh (VERY IMPORTANT)
     */
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(handleSendToken);

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
      unsubscribeTokenRefresh();
    };
  }, [userToken, handleSendToken]);
};

export default useNotification;
