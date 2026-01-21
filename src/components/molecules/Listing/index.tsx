import { Dimensions, ScrollView, View } from 'react-native';
import React from 'react';
import CardContainer2 from '../CardContainer2';
import PropertyCardProps from '../CardContainer/PropertyCardProps.type';

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

export default function Listing() {
  return (
    <ScrollView
      contentContainerStyle={[
        { alignItems: 'center', width: Dimensions.get('screen').width },
      ]}
    >
      <CardContainer2 {...cardData}></CardContainer2>
      <CardContainer2 {...cardData}></CardContainer2>
      <CardContainer2 {...cardData}></CardContainer2>
    </ScrollView>
  );
}
