import useTheme from '@hooks/useTheme';
import { ReactElement } from 'react';
import { ViewStyle, View, Text } from 'react-native';

const InfoRow = ({
  field,
  value,
  style,
  textColor,
}: {
  field: string;
  value: string | ReactElement;
  style?: ViewStyle;
  textColor?: string;
}) => {
  const { Colors } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      <Text style={{ color: Colors.textSecondary, width: '40%' }}>{field}</Text>
      <Text
        style={{
          color: textColor ?? Colors.textPrimary,
          width: '60%',
          textAlign: 'right',
        }}
      >
        {value || field}
      </Text>
    </View>
  );
};

export default InfoRow;
