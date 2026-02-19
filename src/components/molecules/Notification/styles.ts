import { ThemeColors } from '@theme/constants';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      marginVertical: 4,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
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
    // notificationCard: {
    //   marginVertical: 5,
    //   padding: 10,
    //   borderWidth: 1,
    //   backgroundColor: Colors.surface,
    //   borderColor: Colors.border,
    //   borderRadius: 4,
    // },
    // notificationHeader: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   marginBottom: 5,
    // },
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
      width: Dimensions.get('window').width * 0.4,
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
