import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import useTheme from '@hooks/useTheme';
import { Icons } from '@utils/icons'; // Assuming you have an icon set
import Button from '@components/atoms/Button';

const { height } = Dimensions.get('window');

interface ListEmptyProps {
  title?: string;
  description?: string;
  onRefresh?: () => void;
}

const ListEmptyComponent = ({
  title = 'No Properties Found',
  description = "We couldn't find any properties matching your criteria right now.",
  onRefresh,
}: ListEmptyProps) => {
  const { Colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Illustration Wrapper */}
      <View style={[styles.iconCircle, { backgroundColor: Colors.surface }]}>
        <Icons.Location width={60} height={60} color={Colors.textMuted} />
      </View>

      <Text style={[styles.title, { color: Colors.textPrimary }]}>{title}</Text>

      <Text style={[styles.description, { color: Colors.textSecondary }]}>
        {description}
      </Text>

      {onRefresh && (
        <Button
          title="Refresh List"
          onPress={onRefresh}
          style={styles.button}
          size="sm"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: height * 0.15,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    minWidth: 150,
  },
});

export default ListEmptyComponent;
