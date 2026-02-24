import React from 'react';
import { View, Text } from 'react-native';
import useTheme from '@hooks/useTheme';
import { Icons } from '@utils/icons'; // Assuming you have an icon set
import Button from '@components/atoms/Button';
import useStyles from '@hooks/useStyles';
import styles from './styles';

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
  const { dynamicStyles } = useStyles(styles);

  return (
    <View style={dynamicStyles.container}>
      <View style={[dynamicStyles.iconCircle]}>
        <Icons.Location width={60} height={60} color={Colors.textMuted} />
      </View>

      <Text style={[dynamicStyles.title]}>{title}</Text>

      <Text style={[dynamicStyles.description]}>{description}</Text>

      {onRefresh && (
        <Button
          title="Refresh List"
          onPress={onRefresh}
          style={dynamicStyles.button}
          size="sm"
        />
      )}
    </View>
  );
};

export default ListEmptyComponent;
