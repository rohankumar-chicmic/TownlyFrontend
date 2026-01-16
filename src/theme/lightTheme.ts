export const LightColors = {
  // Primary Brand Colors
  primary: '#BECC33',       // Vibrant Lime (Buttons, Active Icons)
  primaryDark: '#9CAF2A',   // Hover/Pressed state for primary

  // Background Colors
  background: '#0D0D0D',    // Deep Black/Charcoal (Main App BG)
  surface: '#1A1A1A',       // Card/Container Background
  elevated: '#242424',      // Modals or nested cards

  // Text Colors
  textPrimary: '#FFFFFF',   // Main Headings
  textSecondary: '#A0A0A0', // Subtitles/Body text
  textMuted: '#666666',     // Captions/Disabled text

  // Status & Feedback
  success: '#4ADE80',       // Positive growth/Profit
  error: '#FF5C5C',         // Alerts/Loss
  warning: '#FACC15',       // Pending actions

  // Border/Divider
  border: '#2D2D2D',        // Thin separators
  outline: '#3F3F3F',       // Input borders
};

export type DefaultColorType = typeof LightColors;
