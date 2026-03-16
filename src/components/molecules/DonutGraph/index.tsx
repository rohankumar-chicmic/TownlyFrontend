import React, { memo, useState, useMemo } from 'react';
import { Text, View, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';

export interface DonutDataPoint {
  label: string;
  percentage: number;
}

export interface DonutData {
  data: DonutDataPoint[];
}

const SLICE_COLORS = ['#9161f3', '#3b82f6', '#f59e0b', '#10b981'];
const SLICE_LABELS = ['Residential', 'Commercial', 'Land', 'Industrial'];

function DonutGraph({ data }: Readonly<DonutData>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // ✅ No more useState + useEffect pattern — derived with useMemo
  const pieData = useMemo(
    () =>
      SLICE_LABELS.map((text, i) => ({
        value: data?.[i]?.percentage ?? 0,
        color: SLICE_COLORS[i],
        text,
        focused: focusedIndex === i,
      })),
    [data, focusedIndex],
  );

  const handlePress = (index: number) => setFocusedIndex(index);
  const clearFocus = () => setFocusedIndex(null);

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
            {pieData.map((dataPoint, i) => (
              <View
                key={dataPoint.text}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View
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
                    focusedIndex === i
                      ? [dynamicStyles.smallText, { color: Colors.textPrimary }]
                      : dynamicStyles.smallText
                  }
                >
                  {dataPoint.value}% {dataPoint.text}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ alignSelf: 'flex-end' }}>
            <PieChart
              data={pieData}
              donut
              textColor={Colors.textSecondary}
              radius={70}
              textSize={20}
              onPress={(_: any, index: number) => handlePress(index)}
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

export default memo(DonutGraph);
