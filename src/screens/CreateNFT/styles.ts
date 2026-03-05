import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      padding: 20,
      margin: 5,
    },
    heroPrimarytext: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 15,
      color: Colors.textSecondary,
    },
    heading: {
      fontSize: 20,
      fontWeight: '400',
      color: Colors.textPrimary,
    },
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    containerStyle: {
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      padding: 8,
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      width: '49%',
      marginBottom: 8,
    },
    dataPanel: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerSection: {
      paddingBottom: 16,
      marginBottom: 12,
    },
    label: {
      marginBottom: 6,
      fontSize: 14,
      paddingHorizontal: 5,
    },
    input: {
      borderRadius: 10,
      padding: 12,
      fontSize: 13,
      borderWidth: 1,
    },
    counter: {
      alignSelf: 'flex-end',
      fontSize: 11,
      opacity: 0.6,
      marginTop: 4,
    },
    safeArea: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    scrollView: {
      backgroundColor: Colors.background,
    },
    scrollContent: {
      flexGrow: 1,
    },
    flexGrow: {
      flexGrow: 1,
    },

    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      height: 50,
      marginBottom: 10,
    },

    backButtonWrapper: {
      position: 'absolute',
      left: 0,
      zIndex: 100,
    },

    headerTitle: {
      textAlign: 'center',
      width: '70%',
      fontSize: 30,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },

    subtitle: {
      alignSelf: 'center',
      color: Colors.textSecondary,
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 20,
    },

    stepContainer: {
      padding: 15,
      borderRadius: 15,
      backgroundColor: Colors.elevated,
      borderColor: Colors.border,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    modalContainer: {
      width: '100%',
      backgroundColor: Colors.elevated,
      borderRadius: 20,
      padding: 20,
      borderWidth: 1,
      borderColor: Colors.border,
    },

    modalTitle: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },

    modalText: {
      color: Colors.textSecondary,
      fontSize: 14,
      marginBottom: 20,
    },

    modalButtonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
    },

    cancelButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors.border,
    },

    cancelButtonText: {
      color: Colors.textSecondary,
    },

    confirmButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: Colors.error || '#E53935',
    },

    confirmButtonText: {
      color: Colors.background,
      fontWeight: '600',
    },
  });

export default styles;
