export const LightColors = {
  // Primary Brand Colors (Locked as requested)
  primary: '#BECC33',
  primaryDark: '#7A851C',

  // Background Colors (High-Contrast Layering)
  background: '#FFFFFF', // Pure White base
  surface: '#F1F5F9', // Noticeably darker than white for clear card separation
  elevated: '#E2E8F0', // Distinctly darker for nested elements/modals

  // Text Colors (Maximum Legibility)
  textPrimary: '#0F172A', // Near-black Navy (Better contrast than pure black)
  textSecondary: '#334155', // Solid slate for sub-text
  textMuted: '#64748B', // Darkest "muted" gray that still meets contrast standards

  // Status & Feedback (More intense saturation)
  success: '#3d985f', // Positive growth/Profit
  error: '#991B1B', // Deep Crimson
  warning: '#854D0E', // Dark Ochre

  // Border/Divider (Sharper definition)
  border: '#CBD5E1', // Stronger line for structure
  outline: '#94A3B8', // Clearly defined input borders for accessibility
};

export type DefaultColorType = typeof LightColors;
