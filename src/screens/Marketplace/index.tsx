import React from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';

import SearchInput from '@components/molecules/SearchInput';
import PropertyListing from '@components/molecules/PropertyListing';

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={dynamicStyles.container}>
      <SearchInput />
      <PropertyListing />
    </View>
  );
};
export default Marketplace;
