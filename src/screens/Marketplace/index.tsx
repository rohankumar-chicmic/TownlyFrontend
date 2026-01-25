import React from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';

import SearchInput from '@components/molecules/SearchInput';

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={dynamicStyles.container}>
      <SearchInput />
      <ScrollView
        bounces={false}
        contentContainerStyle={dynamicStyles.container}
      >
      </ScrollView>
    </View>
  );
};
export default Marketplace;
