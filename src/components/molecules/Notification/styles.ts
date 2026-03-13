import { ThemeColors } from '@theme/constants';
import { StyleSheet } from 'react-native';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    deleteContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      marginVertical: 6,
    },

    deleteButton: {
      backgroundColor: '#FF3B30',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },

    deleteText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 13,
    },

    content: {
      flex: 1,
      paddingLeft: 10,
    },
    card: {
      marginVertical: 4,
      padding: 10,
      borderRadius: 5,
    },
    unreadBar: {
      width: 4,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      backgroundColor: Colors.primary,
      marginRight: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    title: {
      fontSize: 14,
      color: Colors.textPrimary,
    },
    message: {
      fontSize: 12,
      color: Colors.textSecondary,
      marginBottom: 4,
    },
    time: {
      fontSize: 10,
      color: Colors.textSecondary,
    },
    dataPanelCard: {
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      padding: 8,
      marginVertical: 4,
    },
    dataPanelHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    dataPanelTitle: {
      fontSize: 14,
      color: Colors.textPrimary,
      flex: 1,
    },
    dataPanelMessage: {
      fontSize: 12,
      color: Colors.textSecondary,
      marginBottom: 4,
    },
    dataPanelTime: {
      fontSize: 10,
      color: Colors.textSecondary,
    },
    notificationCard: {
      marginVertical: 4,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    notificationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    notificationTitle: {
      fontSize: 14,
      color: Colors.textPrimary,
    },
    notificationMessage: {
      fontSize: 12,
      color: Colors.textSecondary,
      marginBottom: 4,
    },
    notificationTime: {
      fontSize: 10,
      color: Colors.textSecondary,
    },
    container: {
      backgroundColor: Colors.background,
      padding: 20,
      margin: 5,
    },
    heroPrimarytext: {
      fontSize: 25,
      fontWeight: 'bold',
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
      marginRight: 5,
    },
    dataPanel: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    headerSection: {
      paddingBottom: 5,
      marginBottom: 5,
    },
  });

export default styles;
