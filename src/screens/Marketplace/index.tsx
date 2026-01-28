import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  useColorScheme,
} from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';

import SearchInput from '@components/molecules/SearchInput';
import PropertyListing from '@components/molecules/PropertyListing';
import useTheme from '@hooks/useTheme';

import { useLazySearchPropertiesQuery } from '@redux/PropertyApiReducer';

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [filter, setFilter] = useState('');
  const [text, setText] = useState('');
  const [triggerSearch, { data, isLoading, error }] =
    useLazySearchPropertiesQuery();

  const onSearch = () => {
    triggerSearch({
      search: text,
      propertyType: filter,
    });
  };

  useEffect(() => {
    onSearch();
  }, [triggerSearch, onSearch]);

  return (
    <View style={dynamicStyles.container}>
      <SearchInput onPress={onSearch} text={text} setText={setText} />
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        }}
      >
        <Pressable
          style={[
            dynamicStyles.tag,
            {
              borderWidth: 1,
              borderColor: filter == '' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color: filter == '' ? Colors.primary : Colors.textSecondary,
              },
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            dynamicStyles.tag,
            {
              borderWidth: 1,
              borderColor: filter == 'land' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('land')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color: filter == 'land' ? Colors.primary : Colors.textSecondary,
              },
            ]}
          >
            Land
          </Text>
        </Pressable>
        <Pressable
          style={[
            dynamicStyles.tag,
            {
              borderWidth: 1,
              borderColor:
                filter == 'commercial' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('commercial')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color:
                  filter == 'commercial'
                    ? Colors.primary
                    : Colors.textSecondary,
              },
            ]}
          >
            Commercial
          </Text>
        </Pressable>
        <Pressable
          style={[
            dynamicStyles.tag,
            {
              borderWidth: 1,
              borderColor:
                filter == 'residential' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('residential')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color:
                  filter == 'residential'
                    ? Colors.primary
                    : Colors.textSecondary,
              },
            ]}
          >
            Residential
          </Text>
        </Pressable>
      </View>
      <PropertyListing data={data?.items} />
    </View>
  );
};
export default Marketplace;
