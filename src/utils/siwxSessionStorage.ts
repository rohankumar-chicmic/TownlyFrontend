import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIWXSession } from '@reown/appkit-react-native';

const KEY = '@siwx_session';

export const saveSiwxSession = async (session: SIWXSession) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(session));
};

export const getSiwxSession = async (): Promise<SIWXSession | null> => {
  const value = await AsyncStorage.getItem(KEY);
  return value ? JSON.parse(value) : null;
};

export const clearSiwxSession = async () => {
  await AsyncStorage.removeItem(KEY);
};
