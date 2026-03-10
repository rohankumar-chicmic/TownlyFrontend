import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  dragX: any;
  onDelete: () => void;
  styles: any;
}

const RightAction = ({ dragX, onDelete, styles }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(dragX.value, [-100, 0], [0, 100]);

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View style={[styles.deleteContainer, animatedStyle]}>
      <Pressable style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </Animated.View>
  );
};

export default RightAction;
