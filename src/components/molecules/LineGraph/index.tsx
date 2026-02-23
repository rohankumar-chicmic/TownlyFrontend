import { Text, View, Pressable, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';

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

  const range = max - min || max * 0.02;
  const step = range / sections;
  const padding = range * 0.1;

  return {
    maxValue: range + padding,
    stepValue: step,
    minValue: min,
  };
};

export default function LineGraph({ data }: Readonly<LineGraphProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  // if (!data || data.length === 0) return null;

  const lineData = (data ?? []).map((item, index) => ({
    value: Number(item.value) || 0,
    label: item.label || String(index),
  }));

  const values = data.map(d => Number(d.value) || 0);
  const { maxValue, minValue } = getYAxisScale(values, 4);

  return (
    <Pressable>
      <View style={dynamicStyles.container}>
        <Text style={dynamicStyles.heading}>Portfolio Growth</Text>
        <Text style={[dynamicStyles.smallText, { paddingBottom: 10 }]}>
          Value over time
        </Text>
        <View style={{ paddingLeft: '3%', alignItems: 'center' }}>
          <LineChart
            maxValue={maxValue}
            yAxisOffset={minValue}
            curved
            curvature={0.04}
            data={lineData}
            width={Dimensions.get('window').width * 0.7}
            overflowBottom={20}
            thickness={2}
            isAnimated
            onDataChangeAnimationDuration={0.3}
            spacing={Dimensions.get('window').width * 0.11}
            initialSpacing={10}
            endSpacing={0}
            color={Colors.primary}
            height={Dimensions.get('window').height * 0.15}
            dataPointsHeight={8}
            dataPointsWidth={8}
            dataPointsColor={Colors.primary}
            startFillColor={Colors.primary}
            startOpacity={0.02}
            endOpacity={0.01}
            yAxisColor={Colors.textSecondary}
            xAxisColor={Colors.textSecondary}
            yAxisTextStyle={{ color: Colors.textSecondary, fontSize: 12 }}
            xAxisLabelTextStyle={{ color: Colors.textSecondary, fontSize: 12 }}
            rulesColor={Colors.border}
            animateOnDataChange
            showVerticalLines
            verticalLinesColor={Colors.border}
            noOfSections={4}
          />
        </View>
      </View>
    </Pressable>
  );
}
