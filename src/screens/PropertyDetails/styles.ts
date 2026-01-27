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
      zIndex: 0
    },

    section: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    
    title: {
      fontSize: 25,
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
      backgroundColor: Colors.outline,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
    },

    tagText: {
      color: Colors.primary,
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
      fontSize: 20,
      color: Colors.primary,
      fontWeight: '600',
      marginBottom: 12,
      alignSelf: 'center',
      borderBottomColor: Colors.border, 
      borderBottomWidth:1
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
    sectionTitle: {
      fontSize: 18,
      fontWeight:'500',
      color: Colors.textPrimary,
      marginBottom: 10,
    },
    containerStyle: {
      flex: 1, 
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      padding: 10,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  });

export default styles;
