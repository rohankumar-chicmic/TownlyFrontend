import { Text, View, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import { useState } from 'react';

export default function DonutGraph() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [pieData, setPieData] = useState([
    { value: 65, color: '#9161f3', text: 'Residential', focused: false }, // Residential
    { value: 22.3, color: '#3b82f6', text: 'Commercial', focused: false }, // Commercial
    { value: 8.7, color: '#10b981', text: 'Industrial', focused: false }, // Industrial
    { value: 4, color: '#f59e0b', text: 'Land', focused: false }, // Land
  ]);

  const handlePress = (index: number) => {
    setPieData(prev =>
      prev.map((item, i) => ({
        ...item,
        focused: i === index,
      })),
    );
  };

  const clearFocus = () => {
    setPieData(prev =>
      prev.map(item => ({
        ...item,
        focused: false,
      })),
    );
  };

  return (
    <Pressable onPress={clearFocus}>
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.heading}>Holdings By Category</Text>
        <Text style={dynamicStyles.smallText}>
          Distribution across property types
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ paddingVertical: 16, justifyContent: 'space-evenly' }}>
            {pieData.map(dataPoint => (
              <View key={dataPoint.text} style={{ flexDirection: 'row' }}>
                <View
                  key={dataPoint.text}
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: dataPoint.color,
                    marginRight: 14,
                  }}
                />
                <Text
                  style={
                    dataPoint.focused
                      ? [dynamicStyles.smallText, { color: 'white' }]
                      : dynamicStyles.smallText
                  }
                >
                  {dataPoint.value}
                  {'% '}
                  {dataPoint.text}
                </Text>
              </View>
            ))}
          </View>

          <View
            style={{
              alignSelf: 'flex-end',
            }}
          >
            <PieChart
              data={pieData}
              donut
              textColor={Colors.textSecondary}
              radius={70}
              textSize={20}
              onPress={(_, index) => handlePress(index)}
              innerCircleColor={Colors.surface}
              innerRadius={40}
              isAnimated
              strokeWidth={5}
              strokeColor={Colors.surface}
              sectionAutoFocus
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
