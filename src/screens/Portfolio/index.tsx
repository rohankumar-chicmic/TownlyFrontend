import { View, Text, ScrollView } from 'react-native';
import DonutGraph from '@components/molecules/DonutGraph';
import React from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import useTheme from '@hooks/useTheme';
import LineGraph from '@components/molecules/LineGraph';
import Button from '@components/atoms/Button';
import { useAppNavigation } from '@hooks/useNavigation';

export default function Portfolio() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={dynamicStyles.container}
    >
      <View>
        <View style={[dynamicStyles.headerSection]}>
          <Text style={[dynamicStyles.heroPrimarytext]}>
            Investor Portfolio
          </Text>
          <Text style={[dynamicStyles.heroText]}>
            Track and manage your real-world asset investments
          </Text>
        </View>
        <View>
          <View style={dynamicStyles.dataPanel}>
            <View style={dynamicStyles.containerStyle}>
              <Text style={dynamicStyles.heroText}>Total Invested</Text>
              <Text style={dynamicStyles.heading}>2.1245 ETH</Text>
              <Text style={dynamicStyles.smallText}>
                4 Properties <Text>120 Tokens</Text>
              </Text>
            </View>
            <View style={dynamicStyles.containerStyle}>
              <Text style={dynamicStyles.heroText}>Current Value</Text>
              <Text style={dynamicStyles.heading}>2.1245 ETH</Text>
              <Text
                style={[dynamicStyles.smallText, { color: Colors.primary }]}
              >
                +2.04% overall return
              </Text>
            </View>
            <View style={dynamicStyles.containerStyle}>
              <Text style={dynamicStyles.heroText}>Total Returns</Text>
              <Text style={dynamicStyles.heading}>+0.04 ETH</Text>
              <Text style={dynamicStyles.smallText}>Income: 0.0357 ETH</Text>
            </View>
            <View style={dynamicStyles.containerStyle}>
              <Text style={dynamicStyles.heroText}>Total Returns</Text>
              <Text style={dynamicStyles.heading}>2.1245 ETH</Text>
              <Text style={dynamicStyles.smallText}>
                Next payment: Feb 1, 2025
              </Text>
            </View>
          </View>
        </View>
        <DonutGraph></DonutGraph>
        <LineGraph></LineGraph>

        <Button
          title="Create Property"
          onPress={() => navigation.navigate('CreateNft')}
        ></Button>
      </View>
    </ScrollView>
  );
}
