import { StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/constants';

const styles = (Colors: ThemeColors) => StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    marginVertical: 10,
  },
  primaryText: {
    color: '#000000', 
    fontSize: 16,
    fontWeight: '700',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    height: 52,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    marginVertical: 10,
  },
  outlineText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;