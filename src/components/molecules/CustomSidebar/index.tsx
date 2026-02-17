import React from 'react';
import { View, Switch, Text, ColorValue } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAppNavigation } from '@hooks/useNavigation';
import { useAppSelector, useAppDispatch } from '@redux/store';
import useTheme from '@hooks/useTheme';
import { useAppKit } from '@reown/appkit-react-native';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { THEME } from '@theme/constants';

export default function CustomSidebar(props: any) {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const { Colors, toggleTheme, currentTheme } = useTheme();
  const { disconnect } = useAppKit();
  const { dynamicStyles } = useStyles(styles);
  const user = useAppSelector(state => state.auth.userData);
  const darkTheme = currentTheme === THEME.DARK;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: Colors.surface }}
    >
      <View
        style={[
          dynamicStyles.menuItem,
          {
            backgroundColor: Colors.background,
            borderRadius: 12,
            borderColor: Colors.border,
            borderWidth: 1,
          },
        ]}
      >
        <Text
          style={{
            color: Colors.textPrimary,
            fontSize: 18,
            fontWeight: '500',
          }}
        >
          Dark Mode:
        </Text>
        <Switch
          thumbColor={Colors.border}
          onChange={toggleTheme}
          trackColor={{ false: Colors.elevated, true: Colors.textMuted }}
          value={darkTheme}
        ></Switch>
      </View>

      <View style={{ flex: 1 }} />
    </DrawerContentScrollView>
  );
}
