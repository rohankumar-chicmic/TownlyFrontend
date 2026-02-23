import useStyles from '@hooks/useStyles';
import { Pressable, Text } from 'react-native';
import styles from './styles';
import useTheme from '@hooks/useTheme';

type FilterButtonProps<T> = {
  label: string;
  value?: T;
  currentValue?: T;
  onPress: () => void;
};

const FilterButton = ({
  label,
  value,
  currentValue,
  onPress,
}: FilterButtonProps<string | number>) => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  return (
    <Pressable
      style={[
        dynamicStyles.tag,
        {
          borderWidth: 1,
          borderColor:
            currentValue === value ? Colors.primaryDark : Colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          dynamicStyles.tagText,
          {
            color:
              currentValue === value
                ? Colors.primaryDark
                : Colors.textSecondary,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default FilterButton;
