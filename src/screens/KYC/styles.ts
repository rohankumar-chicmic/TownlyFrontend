import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      padding: 20,
      paddingBottom: 0,
    },
    heroPrimarytext: {
      fontSize: 30,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    heroText: {
      fontSize: 15,
      marginBottom: 25,
      marginTop: 10,
      width: '90%',
      color: Colors.textSecondary,
    },
    formSection: {
      marginTop: 10,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors.textPrimary,
      marginBottom: 8,
    },
    input: {
      backgroundColor: Colors.surface,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 15,
      color: Colors.textPrimary,
    },
    textArea: {
      height: 80,
      textAlignVertical: 'top',
    },
    documentTypeContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    documentTypeButton: {
      flex: 1,
      backgroundColor: Colors.surface,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
    },
    documentTypeButtonActive: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
    },
    documentTypeText: {
      fontSize: 14,
      color: Colors.textSecondary,
      fontWeight: '500',
    },
    documentTypeTextActive: {
      color: Colors.background,
    },
    uploadButton: {
      backgroundColor: Colors.surface,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
    },
    uploadButtonText: {
      fontSize: 15,
      color: Colors.primary,
      fontWeight: '600',
    },
    helperText: {
      fontSize: 13,
      color: Colors.textSecondary,
      marginTop: 6,
    },
    containerSurface: {
      padding: 15,
      borderRadius: 15,
      backgroundColor: Colors.elevated,
      borderColor: Colors.border,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    dropdownPlaceholder: {
      fontSize: 13,
      color: Colors.textMuted,
    },
    dropdownSelectedText: {
      fontSize: 13,
      color: Colors.textPrimary,
    },
    dropdownContainer: {
      borderRadius: 10,
      backgroundColor: Colors.background,
      borderWidth: 1,
      borderColor: Colors.border,
      marginTop: 5,
      overflow: 'hidden',
    },
    dropdownItemText: {
      fontSize: 13,
      color: Colors.textPrimary,
    },
    error: {
      color: Colors.warning,
      fontSize: 10,
      marginLeft: 5,
      marginBottom: 4,
    },
  });

export default styles;



