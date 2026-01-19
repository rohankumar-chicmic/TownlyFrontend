import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';
import { logoutUser } from '@redux/CommonReducer';
import { useAppDispatch } from '@redux/store';

import PropertyCardProps from '@components/molecules/CardContainer/PropertyCardProps.type';

import { useTranslation } from 'react-i18next';
import CardContainer from '@components/molecules/CardContainer';
import useTheme from '@hooks/useTheme';

const Marketplace = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  const { dynamicStyles, Layout, toggleTheme } = useStyles(styles);
  const { Colors } = useTheme();


  const cardData: PropertyCardProps = {
    title: "Arbit Cottage",
    location: "South Japan",
    imageUrl: "https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png",
    isFractional: true,
    category: "Residential",
    riskData: {
      score: 3.4,
      label: "Low Moderate Risk"
    },
    pricing: {
      pricePerShare: 100,
      currency: "ETH",
      availability: 69985
    },
    yieldPercentage: 8.4,
    onViewDetails: () => console.log("Navigating to details..."),
    onInvest: () => console.log("Initiating investment...")
  };


  return (
    <ScrollView bounces={true} style={{ backgroundColor: Colors.background }}>
      
        <View style={{
          height: '10%',
          paddingVertical: 15,
          marginVertical: '5%',
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border
        }}>
          <Text style={dynamicStyles.heading}>Featured Properties</Text>
          <Text style={dynamicStyles.smallText}>Explore our latest tokenized real estate opportunities</Text>
        </View>

        <CardContainer {...cardData} ></CardContainer>
      

    </ScrollView>
  );
};
export default Marketplace;
