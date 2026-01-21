import React from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';
// import { logoutUser } from '@redux/CommonReducer';
// import { useAppDispatch } from '@redux/store';

// import PropertyCardProps from '@components/molecules/CardContainer/PropertyCardProps.type';

// import { useTranslation } from 'react-i18next';
// import useTheme from '@hooks/useTheme';
import SearchInput from '@components/molecules/SearchInput';
import Listing from '@components/molecules/Listing';

// const cardData: PropertyCardProps = {
//   title: 'Arbit Cottage',
//   location: 'South Japan',
//   imageUrl: 'https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png',
//   isFractional: true,
//   category: 'Residential',
//   riskData: {
//     score: 3.4,
//     label: 'Low Moderate Risk',
//   },
//   pricing: {
//     pricePerShare: 100,
//     currency: 'ETH',
//     availability: 69985,
//   },
//   yieldPercentage: 8.4,
//   onViewDetails: () => console.log('Navigating to details...'),
//   onInvest: () => console.log('Initiating investment...'),
// };

const Marketplace = () => {
  // const { i18n } = useTranslation();
  // const dispatch = useAppDispatch();
  // const logout = () => {
  //   dispatch(logoutUser());
  // };
  const { dynamicStyles } = useStyles(styles);
  // const [text, onChangeText] = React.useState('Useless Text');
  // const { Colors } = useTheme();

  return (
    <View style={dynamicStyles.container}>
      <SearchInput />
      <ScrollView
        bounces={false}
        contentContainerStyle={dynamicStyles.container}
      >
        <Listing />
      </ScrollView>
    </View>
  );
};
export default Marketplace;
