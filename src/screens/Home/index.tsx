import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';

import Button from '@components/atoms/Button';

import useTheme from '@hooks/useTheme';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import { ROUTES } from 'src/navigation/constants';
import CardContainer2 from '@components/molecules/CardContainer2';
import { useAppNavigation } from '@hooks/useNavigation';

const cardData: PropertyCardProps = {
  title: 'Arbit Cottage',
  location: 'South Japan',
  imageUrl: 'https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png',
  isFractional: true,
  category: 'Residential',
  riskData: {
    score: 3.4,
    label: 'Low Moderate Risk',
  },
  pricing: {
    pricePerShare: 100,
    currency: 'ETH',
    availability: 69985,
  },
  yieldPercentage: 8.4,
  onViewDetails: () => console.log('Navigating to details...'),
  onInvest: () => console.log('Initiating investment...'),
};

const Home = () => {
  const { dynamicStyles } = useStyles(styles);
  const navigation = useAppNavigation();
  const { Colors } = useTheme();


  return (
    <ScrollView bounces={false} style={{ backgroundColor: Colors.background }}>
      <View style={dynamicStyles.container}>
        <View>
          <Text style={[dynamicStyles.heroPrimarytext]}>
            Fractional, Tokenized
          </Text>
          <Text
            style={[
              dynamicStyles.heroPrimarytext,
              { color: Colors.primaryDark },
            ]}
          >
            Real Estate Investing
          </Text>
        </View>
        <View>
          <Text style={dynamicStyles.heroText}>
            Global access to premium real estate. Own fractions, earn weekly
            rent distributions, and trade with transparency.
          </Text>
        </View>
        {/* <Button title="Toggle theme" onPress={toggleTheme}></Button> */}
        <Button
          title="Explore Marketplace"
          onPress={() => navigation.navigate(ROUTES.MARKETPLACE)}
          givenStyle={{ width: '100%' }}
        ></Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingVertical: 10,
          }}
        >
          <View style={dynamicStyles.containerStyle}>
            <Text
              style={[dynamicStyles.heroPrimarytext, { color: Colors.primary }]}
            >
              99%
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 80 }]}>
              Customer Satifaction
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text
              style={[dynamicStyles.heroPrimarytext, { color: Colors.primary }]}
            >
              50M+
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 90 }]}>
              In property Sales
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text
              style={[dynamicStyles.heroPrimarytext, { color: Colors.primary }]}
            >
              2,600+
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 100 }]}>
              Successful Sales
            </Text>
          </View>
        </View>

        <View style={dynamicStyles.headingSection}>
          <Text style={dynamicStyles.heading}>Featured Properties</Text>
          <Text style={dynamicStyles.smallText}>
            Explore our latest tokenized real estate opportunities
          </Text>
        </View>

        <CardContainer2 {...cardData}></CardContainer2>
      </View>
    </ScrollView>
  );
};
export default Home;
