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

import { useTranslation } from 'react-i18next';

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
      <View>
        
      </View>
        {/* <Pressable
          onPress={() => {
            console.log(i18n.language);
            i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
          }}
        >
          <Text>Translate</Text>
        </Pressable> */}
        
    </>
  );
};
export default Home;
