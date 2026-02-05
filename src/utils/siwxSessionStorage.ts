import AsyncStorage from '@react-native-async-storage/async-storage';
import { type SIWXSession } from '@reown/appkit-react-native';

const SIWX_SESSION_KEY = 'siwx_session';
const SIWX_TOKEN_KEY = 'siwx_access_token';

export const saveSiwxSession = async (session: SIWXSession, token?: string) => {
  try {
    await AsyncStorage.setItem(SIWX_SESSION_KEY, JSON.stringify(session));
    if (token) {
      await AsyncStorage.setItem(SIWX_TOKEN_KEY, token);
      console.log('Saved token for wallet:', session.data.accountAddress);
    }
  } catch (error) {
    console.error('Error saving SIWX session:', error);
  }
};

export const getSiwxSession = async (): Promise<SIWXSession | null> => {
  try {
    const sessionData = await AsyncStorage.getItem(SIWX_SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  } catch (error) {
    console.error('Error getting SIWX session:', error);
    return null;
  }
};

export const getSiwxToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(SIWX_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting SIWX token:', error);
    return null;
  }
};

export const clearSiwxSession = async () => {
  try {
    await AsyncStorage.multiRemove([SIWX_SESSION_KEY, SIWX_TOKEN_KEY]);
    console.log('Cleared session and token');
  } catch (error) {
    console.error('Error clearing SIWX session:', error);
  }
};