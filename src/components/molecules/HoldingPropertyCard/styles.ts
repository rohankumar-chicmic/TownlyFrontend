import { StyleSheet } from 'react-native';
import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: '100%',
      borderRadius: 16,
      padding: 8,
      borderWidth: 1,
      alignSelf: 'center',
      // iOS Shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      // Android Shadow
      backgroundColor: Colors.surface,
      borderColor: Colors.border,
      elevation: 5,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    propertyImage: {
      width: 90,
      height: 90,
      borderRadius: 12,
    },
    mainInfoColumn: {
      flex: 1,
      paddingLeft: 16,
      height: 90,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: 12,
      marginLeft: 4,
      flex: 1,
    },
    badge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.05)',
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '800',
    },
    riskRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    riskLabel: {
      fontSize: 12,
      fontWeight: '600',
    },
    riskValue: {
      fontSize: 14,
      fontWeight: '800',
    },
    divider: {
      height: 1,
      width: '100%',
      marginVertical: 14,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 5,
    },
    dataItem: {
      width: '30%',
    },
    label: {
      fontSize: 9,
      fontWeight: '600',
      marginBottom: 2,
      textTransform: 'uppercase',
    },
    value: {
      fontSize: 12,
      fontWeight: '700',
    },
  });

export default styles;
