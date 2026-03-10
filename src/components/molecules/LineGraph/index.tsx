import { Text, View, Pressable, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import { hexToRGBA } from '@utils/utility';
import { LineGraphSkeleton } from '../SkeletonPortfolio';
import { useState } from 'react';

export interface LinePoint {
  label: string;
  value: number;
}

export interface LineGraphProps {
  data: LinePoint[];
}

const getYAxisScale = (data: number[], sections = 4) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const isFlat = max - min < 0.001;

  const range = isFlat ? min * 0.01 : max - min;
  const padding = range * 0.2;

  const adjustedMin = min - padding;
  const adjustedMax = max + padding;
  const step = (adjustedMax - adjustedMin) / sections;

  return {
    maxValue: adjustedMax - adjustedMin,
    stepValue: step,
    minValue: adjustedMin,
  };
};

export default function LineGraph({ data }: Readonly<LineGraphProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  const lineData = (data ?? []).map((item, index) => ({
    value: Number(item.value) || 0,
    label: item.label || String(index),
  }));

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const chartWidth = Dimensions.get('window').width * 0.7;

  const spacing =
    lineData.length > 1
      ? (chartWidth - 30) / (lineData.length - 1)
      : chartWidth;

  const values = data.map(d => Number(d.value) || 0);
  const { maxValue, minValue } = getYAxisScale(values, 4);

  if (!lineData || lineData.length === 0) {
    return (
      <LineGraphSkeleton surface={Colors.surface} border={Colors.border} />
    );
  }

  return (
    <Pressable>
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.heading}>Portfolio Growth</Text>

        <Text style={[dynamicStyles.smallText, { paddingBottom: 10 }]}>
          Value over time
        </Text>

        <View
          style={{
            padding: 10,
            alignItems: 'center',
            overflow: 'visible',
          }}
        >
          <LineChart
            maxValue={maxValue}
            yAxisOffset={minValue}
            yAxisLabelWidth={40}
            curved
            onlyPositive
            interpolateMissingValues
            extrapolateMissingValues
            curvature={0.04}
            data={lineData}
            thickness={2}
            overflowBottom={20}
            isAnimated
            width={chartWidth}
            spacing={spacing}
            initialSpacing={13}
            endSpacing={0}
            color={hexToRGBA(Colors.primary)}
            height={Dimensions.get('window').height * 0.15}
            adjustToWidth
            dataPointsHeight={10}
            dataPointsWidth={10}
            dataPointsColor={hexToRGBA(Colors.primary)}
            startFillColor={hexToRGBA(Colors.primary)}
            startOpacity={0.02}
            endOpacity={0.01}
            yAxisColor={hexToRGBA(Colors.textSecondary)}
            xAxisColor={hexToRGBA(Colors.textSecondary)}
            yAxisTextStyle={{
              color: hexToRGBA(Colors.textSecondary),
              fontSize: 10,
              marginRight: 8,
            }}
            xAxisLabelTextStyle={{
              color: hexToRGBA(Colors.textSecondary),
              fontSize: 10,
              marginTop: 3,
            }}
            rulesColor={Colors.border}
            showVerticalLines
            verticalLinesColor={Colors.border}
            noOfSections={4}
            focusEnabled
            onFocus={(item: any, index: number) => {
              setSelectedIndex(prev => (prev === index ? null : index));
            }}
            pointerConfig={{
              initialPointerIndex: selectedIndex ?? -1,
              persistPointer: selectedIndex !== null,
              activatePointersOnLongPress: false,
              hidePointer1: selectedIndex === null,

              pointerStripHeight:
                selectedIndex === null
                  ? 0
                  : Dimensions.get('window').height * 0.15 + 20,

              pointerStripColor: Colors.outline,
              pointerStripWidth: 1.5,

              pointerColor: hexToRGBA(Colors.primary),
              radius: 5,

              pointerLabelWidth: 100,
              pointerLabelHeight: 48,
              autoAdjustPointerLabelPosition: true,

              pointerLabelComponent: (
                items: { label: string; value: number }[],
              ) => {
                if (selectedIndex === null) return null;

                const item = items[0];
                if (!item) return null;

                return (
                  <View
                    style={{
                      top: 0,
                      backgroundColor: Colors.elevated,
                      borderRadius: 6,
                      paddingHorizontal: 9,
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderColor: Colors.border,
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.35,
                      shadowRadius: 5,
                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: '#9ca3af',
                        fontSize: 9,
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: 0.6,
                        marginBottom: 1,
                      }}
                    >
                      {item.label}
                    </Text>

                    <Text
                      style={{
                        color: hexToRGBA(Colors.primary),
                        fontSize: 13,
                        fontWeight: '700',
                        letterSpacing: 0.2,
                      }}
                    >
                      ETH {item.value.toLocaleString()}
                    </Text>
                  </View>
                );
              },
            }}
          />
        </View>
      </View>
    </Pressable>
  );
}
