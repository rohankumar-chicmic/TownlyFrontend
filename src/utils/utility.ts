import { Platform } from 'react-native';

import { FONT_WEIGHTS } from './constants';

import { RFValue } from 'react-native-responsive-fontsize';

/**
 * Checks if the current platform is iOS.
 *
 * @returns {boolean} - True if the platform is iOS, false otherwise.
 */
export const isIos = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * Checks if the current platform is Android.
 *
 * @returns {boolean} - True if the platform is Android, false otherwise.
 */
export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

export const boldText = isAndroid() ? FONT_WEIGHTS[700] : FONT_WEIGHTS[600];

export const _scaleText = (fontSize: number) => {
  return RFValue(fontSize);
};
/**
 * Formats numbers to compact versions (K, M, B, T)
 * @param value The number to format
 * @param fractionDigits Number of decimal places (default 1)
 */
export const formatCompactNumber = (
  value: number,
  fractionDigits: number = 1,
): string => {
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: fractionDigits,
  });

  return formatter.format(value);
};

export const sanitizeSearch = (input: string) => {
  if (!input) return '';

  let cleaned = input.trim().replaceAll(/\s+/g, ' ');
  cleaned = cleaned.replaceAll(/[^\w\s,-]/g, '');

  return cleaned;
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    // Clear existing timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Start a new timer
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number = 300,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function (this: any, ...args: Parameters<T>): void {
    if (!inThrottle) {
      // Execute the function immediately
      func.apply(this, args);
      inThrottle = true;

      // Reset the throttle after the specified limit
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export const customParseNumber = (value: any, originalValue: any) => {
  // If the original value is empty string, null, or undefined, return undefined
  if (
    originalValue === '' ||
    originalValue === null ||
    originalValue === undefined
  ) {
    return undefined;
  }

  // Parse the number
  const parsed = Number(originalValue);

  // Return undefined if it's NaN, otherwise return the parsed number
  return Number.isNaN(parsed) ? undefined : parsed;
};

export const hexToRGBA = (hex: string, opacity: number = 1) => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const apiToFormDocument = (doc: any) => ({
  documentName: doc.title,
  file: {
    name: doc.fileName,
    uri: doc.documentUrl,
    type: 'application/octet-stream',
    size: 0,
  },
});

export const formToApiDocument = (doc: any) => ({
  title: doc.documentName,
  fileName: doc.file?.name,
  documentUrl: doc.file?.uri,
});

export const getYAxisScale = (data: number[], sections = 4) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const isFlat = max - min < 0.001;

  const range = isFlat ? min * 0.01 : max - min;
  const padding = range * 0.2;

  const adjustedMin = min - padding;
  const adjustedMax = max + padding;
  const step = (adjustedMax - adjustedMin) / sections;

  return {
    maxValue: adjustedMax - adjustedMin,
    stepValue: step,
    minValue: adjustedMin,
  };
};