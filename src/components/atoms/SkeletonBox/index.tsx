import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';
import useTheme from '@hooks/useTheme';

interface SkeletonBoxProps {
  width?: number | `${number}%` | 'auto';
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width = '100%',
  height,
  borderRadius = 8,
  style,
}) => {
  const { Colors } = useTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: Colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

export default SkeletonBox;
