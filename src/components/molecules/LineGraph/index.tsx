import { Text, View, Pressable, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
import { hexToRGBA } from '@utils/utility';
import { LineGraphSkeleton } from '../SkeletonPortfolio';

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
    ); // Or a loading skeleton/placeholder
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
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            alignItems: 'center',
            overflow: 'visible',
          }}
        >
          <LineChart
            maxValue={maxValue}
            yAxisLabelWidth={40}
            yAxisOffset={minValue}
            curved
            onlyPositive
            interpolateMissingValues
            extrapolateMissingValues
            // stepValue={stepValue}
            curvature={0.04}
            data={lineData}
            overflowBottom={20}
            thickness={2}
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
          />
        </View>
      </View>
    </Pressable>
  );
}
