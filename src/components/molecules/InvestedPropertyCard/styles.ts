import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 14,
      padding: 12,
      marginVertical: 6,
    },

    /* -------- TOP -------- */
    topSection: {
      flexDirection: 'row',
    },

    image: {
      borderRadius: 10,
      marginRight: 12,
    },

    metaContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },

    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    title: {
      fontSize: 18,
      fontWeight: '500',
      color: Colors.textPrimary,
      flexShrink: 1,
    },

    badge: {
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 2,
    },

    badgeText: {
      fontSize: 11,
      fontWeight: '600',
      color: Colors.textPrimary,
    },

    location: {
      fontSize: 13,
      color: Colors.textSecondary,
      marginTop: 4,
    },

    risk: {
      fontSize: 12,
      marginTop: 6,
      color: Colors.textSecondary,
    },

    riskValue: {
      fontWeight: '600',
      color: Colors.textPrimary,
    },

    riskLabel: {
      fontSize: 11,
    },

    divider: {
      height: 1,
      backgroundColor: Colors.border,
      marginVertical: 12,
    },

    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: 14,
    },
  });

export default styles;
