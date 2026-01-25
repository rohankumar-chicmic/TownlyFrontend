import { StyleSheet, Dimensions } from 'react-native';
import { ThemeColors } from '@theme/constants';

const { width } = Dimensions.get('window');

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Colors.background,
    },

    heroImage: {
      width: '100%',
      height: 240,
    },

    section: {
      paddingHorizontal: 16,
      paddingTop: 16,
    },

    title: {
      fontSize: 22,
      fontWeight: '500',
      color: Colors.textPrimary,
    },

    location: {
      fontSize: 14,
      color: Colors.textSecondary,
      marginTop: 4,
    },

    tag: {
      marginTop: 10,
      alignSelf: 'flex-start',
      backgroundColor: Colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
    },

    tagText: {
      color: Colors.background,
      fontSize: 12,
    },

    metrics: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      marginTop: 16,
    },

    investCard: {
      margin: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: Colors.surface,
    },

    cardTitle: {
      fontSize: 18,
      color: Colors.textPrimary,
      marginBottom: 12,
    },

    inputRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },

    label: {
      color: Colors.textSecondary,
      fontSize: 14,
    },

    value: {
      color: Colors.textPrimary,
      fontSize: 14,
    },

    total: {
      color: Colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },

    cta: {
      marginTop: 16,
      backgroundColor: Colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
    },

    ctaText: {
      color: Colors.background,
      fontSize: 16,
      fontWeight: '500',
    },

    sectionTitle: {
      fontSize: 18,
      color: Colors.textPrimary,
      marginBottom: 10,
    },
  });

export default styles;
