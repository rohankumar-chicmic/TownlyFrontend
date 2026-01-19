import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
    },
    heroPrimarytext: { 
      fontSize: 40, 
      fontWeight: 'bold',
      color: Colors.textPrimary, 

    },
    descriptionText:{
      fontSize: 20,
      color: Colors.textSecondary, 
    },
    heading:{ 
      fontSize: 30, 
      fontWeight: '300',
      color: Colors.textPrimary, 
    }, 
    smallText:{
      fontSize: 15,
      color: Colors.textSecondary
    }, 
    detailsText: {
        fontSize: 20, 
        color: Colors.textPrimary
    }
    
  });

export default styles;
