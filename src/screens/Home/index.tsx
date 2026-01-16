import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import styles from './styles';

import useImages from '@hooks/useImages';
import useStyles from '@hooks/useStyles';
import { logoutUser } from '@redux/CommonReducer';
import { useAppDispatch } from '@redux/store';
import { FONT } from '@utils/constants';
import { ICONS } from '@utils/icons';
import { STRINGS } from '@utils/strings';
import Button from '@components/atoms/Button';

import { useTranslation } from 'react-i18next';
import CardContainer from '@components/molecules/CardContainer';

const Home = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  const { dynamicStyles, Layout, toggleTheme } = useStyles(styles);
  const IMAGES = useImages();
  return (
    <>
      <View style={dynamicStyles.container}>
        <View style={{ paddingBottom: 20, paddingTop:10 }}>
          <Text style={dynamicStyles.heroPrimarytext}>Fractional, Tokenized Real Estate Investing</Text>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <Text style={dynamicStyles.heroText}>Global access to premium real estate.</Text>
          <Text style={dynamicStyles.heroText}>Own fractions, earn weekly rent distributions, and trade
            with transparency.
          </Text>
        </View>
        
        <Button title='Toggle theme' onPress={toggleTheme}></Button>
        <CardContainer></CardContainer>
      </View>

    </>
  );
};
export default Home;
