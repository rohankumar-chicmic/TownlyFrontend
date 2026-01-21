import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
    },
    locationText:{
      fontSize: 18,
      color: Colors.textSecondary, 
    },
    heading:{ 
      fontSize: 25, 
      fontWeight: '400',
      color: Colors.textPrimary, 
    }, 
    smallText:{
      fontSize: 15,
      color: Colors.textSecondary
    }, 
    detailsText: {
        fontSize: 20, 
        color: Colors.textPrimary
    }, 
    detailContainer:{
      padding:10
    }, 
    titleContainer:{
      height:'auto', 
      alignSelf:'baseline',
      textAlignVertical:'center',
    }
    
  });

export default styles;
