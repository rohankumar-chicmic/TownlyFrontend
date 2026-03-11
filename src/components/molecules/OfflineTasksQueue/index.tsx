import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  LinearTransition,
} from 'react-native-reanimated';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import styles from './styles';

interface OfflineTask {
  id: string;
  type: string;
  status: string;
  payload: string; // JSON string
  retries: number;
  createdAt: number;
}

interface OfflineTasksQueueProps {
  tasks: OfflineTask[];
  onDiscard?: (taskId: string) => void;
  onRetry?: (taskId: string) => void;
}

export default function OfflineTasksQueue({
  tasks,
  onDiscard,
  onRetry,
}: Readonly<OfflineTasksQueueProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  if (!tasks || tasks.length === 0) {
    return (
      <View style={[dynamicStyles.emptyContainer, { width: '100%' }]}>
        <Text style={dynamicStyles.emptyText}>No pending tasks</Text>
      </View>
    );
  }

  const TaskRow = ({ item }: { item: OfflineTask }) => {
    const [isOpen, setIsOpen] = useState(false);
    const rotation = useSharedValue(0);

    const toggle = () => {
      const next = !isOpen;
      setIsOpen(next);
      rotation.value = withTiming(next ? 180 : 0, { duration: 200 });
    };

    const chevronStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    let payloadData: Record<string, any> = {};
    try {
      payloadData = JSON.parse(item.payload);
    } catch {}

    const overview: { label: string; value: string }[] = [
      { label: 'Type', value: item.type },
      { label: 'Status', value: item.status },
      { label: 'Retries', value: item.retries.toString() },
      { label: 'Created', value: new Date(item.createdAt).toLocaleString() },
    ];
    console.log(payloadData);
    if (payloadData.name)
      overview.push({ label: 'Name', value: payloadData.name });
    if (payloadData.tokens)
      overview.push({ label: 'Tokens', value: `${payloadData.tokens}` });

    return (
      <Animated.View
        layout={LinearTransition.springify()}
        style={dynamicStyles.taskWrapper}
      >
        <TouchableOpacity
          style={[
            dynamicStyles.taskHeader,
            !isOpen && dynamicStyles.taskHeaderClosed,
          ]}
          onPress={toggle}
          activeOpacity={0.7}
        >
          <Text style={dynamicStyles.taskLabel} numberOfLines={1}>
            {item.type}
          </Text>
          <Animated.Text style={[dynamicStyles.chevronIcon, chevronStyle]}>
            <Text>▾</Text>
          </Animated.Text>
        </TouchableOpacity>

        {isOpen && (
          <Animated.View
            entering={FadeIn.duration(160)}
            exiting={FadeOut.duration(120)}
            layout={LinearTransition.springify()}
            style={dynamicStyles.detailsContainer}
          >
            {overview.map(({ label, value }) => (
              <View key={label} style={dynamicStyles.detailRow}>
                <Text style={dynamicStyles.detailLabel}>{label}</Text>
                <Text style={dynamicStyles.detailValue}>{value}</Text>
              </View>
            ))}

            <View style={dynamicStyles.actions}>
              {onRetry && (
                <TouchableOpacity
                  onPress={() => onRetry(item.id)}
                  style={dynamicStyles.actionBtn}
                >
                  <Text style={dynamicStyles.actionText}>Retry</Text>
                </TouchableOpacity>
              )}
              {onDiscard && (
                <TouchableOpacity
                  onPress={() => onDiscard(item.id)}
                  style={dynamicStyles.actionBtn}
                >
                  <Text style={dynamicStyles.actionText}>Discard</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={dynamicStyles.listContainer}>
      {tasks.map(task => (
        <TaskRow key={task.id} item={task} />
      ))}
    </View>
  );
}
