import { Text, View, Pressable } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import Container from '@components/atoms/Container';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import useStyles from '@hooks/useStyles';
// import { useState } from 'react';

export default function LineGraph() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();


  const lineData = [
    { value: 500, label: 'Jul' },
    { value: 500, label: 'Aug' },
    { value: 500, label: 'Sep' },
    { value: 1000, label: 'Oct' },
    { value: 3200, label: 'Nov' },
    { value: 4600, label: 'Dec' },
    { value: 6000, label: 'Jan' },
  ];
 
  return (
    <Pressable>
      <Container style={dynamicStyles.container}>
        <Text style={dynamicStyles.heading}>Portfolio Growth</Text>
        <Text style={[dynamicStyles.smallText, { paddingBottom: 10 }]}>
          Value over time
        </Text>
        <View style={{ paddingLeft: '3%', alignItems: 'center' }}>
          <LineChart
            data={lineData}
            height={140}
            thickness={2}
            spacing={45}
            initialSpacing={10}
            endSpacing={0}
            color={Colors.primary}
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
            // onPress={(item, index) => setSelectedIndex(index)}
          />
        </View>
      </Container>
    </Pressable>
  );
}
