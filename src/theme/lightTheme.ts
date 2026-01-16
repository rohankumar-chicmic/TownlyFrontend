export const LightColors = {
  // Primary Brand Colors (Kept the same as requested)
  primary: '#BECC33',       // Vibrant Lime
  primaryDark: '#9CAF2A',   // Slightly darker lime for contrast on light backgrounds

  // Background Colors
  background: '#f7fafc',    // Pure White
  surface: '#F5F5F5',       // Light Gray (Card/Container)
  elevated: '#E8E8E8',      // Slightly darker gray for nested elements

  // Text Colors
  textPrimary: '#0D0D0D',   // Deep Black (Replaces White)
  textSecondary: '#4A4A4A', // Dark Gray (Replaces A0A0A0)
  textMuted: '#8E8E93',     // Muted Gray (Replaces 666666)

  // Status & Feedback
  success: '#22C55E',       // Slightly darker green for readability on white
  error: '#DC2626',         // Slightly darker red for readability on white
  warning: '#CA8A04',       // Darker yellow/gold for readability on white

  // Border/Divider
  border: '#E2E2E2',        // Light separators
  outline: '#D1D1D1',       // Input borders
};

export type DefaultColorType = typeof LightColors;
