import React from 'react';
import { Pressable, ViewStyle, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTheme from '@hooks/useTheme';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import { Icons } from '@utils/icons';
interface BackButtonProps {
  style?: ViewStyle;
  onPress?: () => void;
  size?: number;
}

export default function BackButton({
  style,
  onPress,
  size = 24,
}: Readonly<BackButtonProps>) {
  const navigation = useNavigation();
  const { Colors } = useTheme();
  const { dynamicStyles } = useStyles(styles);

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={10}
      style={[dynamicStyles.box, style]}
    >
      <View style={{ margin: 10 }}>
        <Icons.BackLogo
          height={10}
          width={10}
          color={Colors.primary}
        ></Icons.BackLogo>
      </View>
    </Pressable>
  );
}
