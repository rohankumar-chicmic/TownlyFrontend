import { loadAsync } from 'expo-font';

// export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

// export const API_BASE_URL = 'https://tonwly.runasp.net/api';
export const API_BASE_URL = 'https://uncombinable-nonscholastic-layton.ngrok-free.dev/api';

export const FONT_WEIGHTS = {
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
  900: '900',
} as const;

export enum NotificationType {
  KycApproved = 1,
  KycRejected,
  PropertyApproved,
  PropertyRejected,
  InvestmentSuccess,
  TokenRequestApproved,
  TokenRequestRejected,
  PropertySoldOut,
}

export interface NotificationProps {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  referenceId: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy: string | null;
}

export const FONT = {
  LIGHT: 'Signika-Negative-Light',
  REGULAR: 'Signika-Negative-Regular',
  MEDIUM: 'Signika-Negative-Medium',
  SEMI_BOLD: 'Signika-Negative-SemiBold',
  BOLD: 'Signika-Negative-Bold',
};

export const preloadFonts = async () => {
  loadAsync({
    [FONT.LIGHT]: require('@assets/fonts/SignikaNegative-Light.ttf'),
    [FONT.REGULAR]: require('@assets/fonts/SignikaNegative-Regular.ttf'),
    [FONT.MEDIUM]: require('@assets/fonts/SignikaNegative-Medium.ttf'),
    [FONT.SEMI_BOLD]: require('@assets/fonts/SignikaNegative-SemiBold.ttf'),
    [FONT.BOLD]: require('@assets/fonts/SignikaNegative-Bold.ttf'),
  });
};
