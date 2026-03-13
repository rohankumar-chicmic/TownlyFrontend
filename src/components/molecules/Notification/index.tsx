import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import RightAction from './RightAction';
import styles from './styles';
import useStyles from '@hooks/useStyles';

export interface NotificationProps {
  item: {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  };
  onPress: () => void;
  onDelete: (id: string) => void;
}

const Notification = ({ item, onPress, onDelete }: NotificationProps) => {
  const { dynamicStyles } = useStyles(styles);

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (mins < 60) return `${mins}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;

    return date.toLocaleDateString();
  };

  const renderRightActions = (_progress: any, dragX: any) => {
    return (
      <RightAction
        dragX={dragX}
        onDelete={() => onDelete(item.id)}
        styles={dynamicStyles}
      />
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
      rightThreshold={100}
    >
      <Pressable
        style={[dynamicStyles.card, { opacity: item.isRead ? 0.85 : 1 }]}
        onPress={onPress}
      >
        {!item.isRead && <View style={dynamicStyles.unreadBar} />}

        <View style={dynamicStyles.content}>
          <View style={dynamicStyles.header}>
            <Text
              numberOfLines={1}
              style={[
                dynamicStyles.title,
                { fontWeight: item.isRead ? '300' : '700' },
              ]}
            >
              {item.title}
            </Text>

            <Text style={dynamicStyles.time}>{formatTime(item.createdAt)}</Text>
          </View>

          <Text numberOfLines={2} style={dynamicStyles.message}>
            {item.message}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};

export default Notification;
