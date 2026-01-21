import { View, Text, Pressable } from 'react-native';
import Container from '@components/atoms/Container';
import React from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import useTheme from '@hooks/useTheme';

export default function Portfolio() {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  return (
    <View style={dynamicStyles.container}>
      <View style={[dynamicStyles.headerSection]}>
        <Text style={[dynamicStyles.heroPrimarytext]}>Investor Portfolio</Text>

        <Text style={[dynamicStyles.heroText]}>
          Track and manage your real-world asset investments
        </Text>

        {/* <Pressable
          onPress={() => console.log('copied to clipboard')}
          style={dynamicStyles.}
        >r
          <Text style={dynamicStyles.smallText}>wallet address</Text>
        </Pressable> */}
      </View>
      <View>
        <View style={dynamicStyles.dataPanel}>
          <Container style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Total Invested</Text>
            <Text style={dynamicStyles.heading}>2.1245 ETH</Text>
            <Text style={dynamicStyles.smallText}>
              4 Properties <Text>120 Tokens</Text>
            </Text>
          </Container>
          <Container style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Current Value</Text>
            <Text style={dynamicStyles.heading}>2.1245 ETH</Text>
            <Text style={[dynamicStyles.smallText, { color: Colors.primary }]}>
              +2.04% overall return
            </Text>
          </Container>
          <Container style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Total Returns</Text>
            <Text style={dynamicStyles.heading}>+0.04 ETH</Text>
            <Text style={dynamicStyles.smallText}>Income: 0.0357 ETH</Text>
          </Container>
          <Container style={dynamicStyles.containerStyle}>
            <Text style={dynamicStyles.heroText}>Total Returns</Text>
            <Text style={dynamicStyles.heading}>2.1245 ETH</Text>
            <Text style={dynamicStyles.smallText}>
              Next payment: Feb 1, 2025
            </Text>
          </Container>
        </View>
      </View>
    </View>
  );
}
