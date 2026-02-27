import React, { useState, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import useStyles from '@hooks/useStyles';
import SearchInput from '@components/molecules/SearchInput';
import useTheme from '@hooks/useTheme';
import { useSearchPropertiesQuery } from '@redux/PropertyApiReducer';
import CardContainer2 from '@components/molecules/CardContainer2';
import ListEmptyComponent from '@components/molecules/ListEmptyComponent';
import FilterButton from '@components/atoms/FilterButton';
import { debounce, sanitizeSearch } from '@utils/utility';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  // State
  const [filter, setFilter] = useState('');
  const [text, setText] = useState('');
  const [params, setParams] = useState({
    search: '',
    page: 1,
  });

  const { data, isFetching, isLoading } = useSearchPropertiesQuery({
    search: params.search,
    page: params.page,
    pageSize: 9,
    propertyType: filter,
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const clean = sanitizeSearch(value);
        setParams({ search: clean, page: 1 });
      }, 200),
    [],
  );

  const handlePressed = (id: string) => {
    navigation.push(ROUTES.PROPERTY_DETAILS, { id: id });
  };

  const debouncedHandlePressed = debounce(handlePressed, 250);

  const handleTextChange = (val: string) => {
    setText(val);
    const hasIllegalChars = /[^a-zA-Z0-9\s,-]/.test(val);

    if (hasIllegalChars) {
      setParams({ search: '___INVALID_SEARCH___', page: 1 });
      return;
    }
    debouncedSearch(val);
  };

  const handleFilterChange = (newVal: string) => {
    setFilter(newVal);
    setParams(prev => ({ ...prev, page: 1 }));
  };

  const handleEndReached = () => {
    if (!isFetching && data?.hasMore) {
      setParams(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <View style={dynamicStyles.container}>
      <SearchInput text={text} onChangeText={handleTextChange} />

      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        }}
      >
        <FilterButton
          label="All"
          value=""
          currentValue={filter}
          onPress={() => handleFilterChange('')}
        />

        <FilterButton
          label="Land"
          value="land"
          currentValue={filter}
          onPress={() => handleFilterChange('land')}
        />

        <FilterButton
          label="Commercial"
          value="commercial"
          currentValue={filter}
          onPress={() => handleFilterChange('commercial')}
        />

        <FilterButton
          label="Residential"
          value="residential"
          currentValue={filter}
          onPress={() => handleFilterChange('residential')}
        />
      </View>
      {isLoading && (
        <Text
          style={[
            dynamicStyles.heroText,
            { alignSelf: 'center', textAlign: 'center' },
          ]}
        >
          Loading Properties...
        </Text>
      )}
      <FlatList
        data={data?.items || []}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <CardContainer2
            {...item}
            onClick={() => debouncedHandlePressed(item.id)}
          />
        )}
        ListEmptyComponent={<ListEmptyComponent />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        style={{ backgroundColor: Colors.background }}
      />
    </View>
  );
};

export default Marketplace;
