import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import styles from './styles';

import useImages from '@hooks/useImages';
import useStyles from '@hooks/useStyles';
import { logoutUser } from '@redux/CommonReducer';
import { useAppDispatch } from '@redux/store';
// import { FONT } from '@utils/constants';
// import { ICONS } from '@utils/icons';
// import { STRINGS } from '@utils/strings';
import Button from '@components/atoms/Button';
import Container from '@components/atoms/Container';
import PropertyCardProps from '@components/molecules/CardContainer/PropertyCardProps.type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/types';
// import { useTranslation } from 'react-i18next';
import CardContainer from '@components/molecules/CardContainer';
import useTheme from '@hooks/useTheme';

import { ROUTES } from 'src/navigation/constants';
import CardContainer2 from '@components/molecules/CardContainer2';

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
  // const { i18n } = useTranslation();
  // const dispatch = useAppDispatch();
  // const logout = () => {
  //   dispatch(logoutUser());
  // };
  const { dynamicStyles, Layout, toggleTheme } = useStyles(styles);
  const { Colors } = useTheme();
  // const IMAGES = useImages();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView bounces={true} style={{ backgroundColor: Colors.background }}>
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
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          <Container style={dynamicStyles.containerStyle}>
            <Text
              style={[dynamicStyles.heroPrimarytext, { color: Colors.primary }]}
            >
              99%
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 80 }]}>
              Customer Satifaction
            </Text>
          </Container>
          <Container style={dynamicStyles.containerStyle}>
            <Text
              style={[dynamicStyles.heroPrimarytext, { color: Colors.primary }]}
            >
              50M+
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 100 }]}>
              In property Sales
            </Text>
          </Container>
          <Container style={dynamicStyles.containerStyle}>
            <Text
              style={[dynamicStyles.heroPrimarytext, { color: Colors.primary }]}
            >
              2,600+
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 100 }]}>
              Successful Sales
            </Text>
          </Container>
        </View>

        <View style={dynamicStyles.headingSection} >
          <Text style={dynamicStyles.heading}>Featured Properties</Text>
          <Text style={dynamicStyles.smallText}>
            Explore our latest tokenized real estate opportunities
          </Text>
        </View>
        <View>

          <CardContainer2 {...cardData}></CardContainer2>
          <CardContainer2 {...cardData}></CardContainer2>
          <CardContainer2 {...cardData}></CardContainer2>
        </View>

      </View>
    </ScrollView>
  );
};
export default Home;
