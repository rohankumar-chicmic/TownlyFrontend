import React from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

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
  const opacity = new Animated.Value(0.5);

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    width,
    height,
    borderRadius,
    backgroundColor: '#E1E9EE',
    opacity,
  };

  return <Animated.View style={[animatedStyle, style]} />;
};

export default SkeletonBox;
