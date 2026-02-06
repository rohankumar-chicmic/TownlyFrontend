import React from 'react';
import { View, Text, Pressable } from 'react-native';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';

export interface NotificationProps {
  item: {
    id: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
  };
  onPress: () => void;
}

const Notification = ({ item, onPress }: NotificationProps) => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Pressable
      style={[dynamicStyles.card, { opacity: item.isRead ? 0.7 : 1 }]}
      onPress={onPress}
    >
      <View style={dynamicStyles.header}>
        <Text
          style={[
            dynamicStyles.title,
            { fontWeight: item.isRead ? '400' : '600' },
          ]}
        >
          {item.title}
        </Text>
        {!item.isRead && (
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: Colors.primary,
            }}
          />
        )}
      </View>
      <Text style={dynamicStyles.message}>{item.message}</Text>
      <Text style={dynamicStyles.time}>{formatTime(item.createdAt)}</Text>
    </Pressable>
  );
};

export default Notification;
