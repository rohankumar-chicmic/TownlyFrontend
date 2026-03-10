import { Text, View, Pressable } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import { useState, useEffect } from 'react';

export interface DonutDataPoint {
  label: string;
  percentage: number;
}

export interface DonutData {
  data: DonutDataPoint[];
}

export default function DonutGraph({ data }: Readonly<DonutData>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [pieData, setPieData] = useState([
    {
      value: data?.[0]?.percentage ?? 0,
      color: '#9161f3',
      text: 'Residential',
      focused: false,
    },
    {
      value: data?.[1]?.percentage ?? 0,
      color: '#3b82f6',
      text: 'Commercial',
      focused: false,
    },
    {
      value: data?.[2]?.percentage ?? 0,
      color: '#f59e0b',
      text: 'Land',
      focused: false,
    },
    {
      value: data?.[3]?.percentage ?? 0,
      color: '#10b981',
      text: 'Industrial',
      focused: false,
    },
  ]);

  useEffect(() => {
    if (!data?.length) return;

    setPieData([
      {
        value: data?.[0]?.percentage ?? 0,
        color: '#9161f3',
        text: 'Residential',
        focused: false,
      },
      {
        value: data?.[1]?.percentage ?? 0,
        color: '#3b82f6',
        text: 'Commercial',
        focused: false,
      },
      {
        value: data?.[2]?.percentage ?? 0,
        color: '#f59e0b',
        text: 'Land',
        focused: false,
      },
      {
        value: data?.[3]?.percentage ?? 0,
        color: '#10b981',
        text: 'Industrial',
        focused: false,
      },
    ]);
  }, [data]);

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
              <View
                key={dataPoint.text}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
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
                      ? [dynamicStyles.smallText, { color: Colors.textPrimary }]
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
