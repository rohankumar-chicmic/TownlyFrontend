import { ThemeColors } from '@theme/constants';
import { StyleSheet } from 'react-native';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 20,
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
    smallText: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
    headerSection: {
      paddingBottom: 5,
      marginBottom: 5,
    },
    filterContainer: {
      flexDirection: 'row',
      borderColor: Colors.border,
      marginVertical: 5,
      marginBottom: 0,
      paddingVertical: 5,
    },
    tag: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      // marginHorizontal: 4,
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: Colors.surface,
    },
    tagText: {
      fontSize: 14,
      fontWeight: '400',
    },
    notificationsContainer: {
      flex: 1,
      marginVertical: 5,
      padding: 10,
      borderWidth: 1,
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      borderRadius: 4
    },
    emptyContainer: {
      padding: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerContainer: {
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    // container: {
    //   backgroundColor: Colors.background,
    //   padding: 20,
    //   margin: 5,
    //   flex: 1,
    // },
    // heroPrimarytext: {
    //   fontSize: 25,
    //   fontWeight: 'bold',
    //   color: Colors.textPrimary,
    // },
    // heroText: {
    //   fontSize: 15,
    //   color: Colors.textSecondary,
    // },
    // heading: {
    //   fontSize: 20,
    //   fontWeight: '400',
    //   color: Colors.textPrimary,
    // },
    // smallText: {
    //   fontSize: 12,
    //   color: Colors.textSecondary,
    // },
    // headerSection: {
    //   paddingBottom: 5,
    //   marginBottom: 5,
    // },
    // tag: {
    //   paddingVertical: 8,
    //   paddingHorizontal: 16,
    //   marginHorizontal: 4,
    //   borderRadius: 4,
    //   borderWidth: 1,
    //   backgroundColor: Colors.surface,
    // },
    // tagText: {
    //   fontSize: 14,
    //   fontWeight: '400',
    // },
    // listContent: {
    //   paddingBottom: 20,
    // },
    // emptyContainer: {
    //   padding: 40,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // footerContainer: {
    //   paddingVertical: 20,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // loadingContainer: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   paddingVertical: 40,
    // },
  });

export default styles;
