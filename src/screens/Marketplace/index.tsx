import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';

import SearchInput from '@components/molecules/SearchInput';
import PropertyListing from '@components/molecules/PropertyListing';
import useTheme from '@hooks/useTheme';

import { useLazySearchPropertiesQuery } from '@redux/PropertyApiReducer';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';

const Marketplace = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [filter, setFilter] = useState('');
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [allProperties, setAllProperties] = useState<PropertyCardProps[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [triggerSearch, { data, isLoading, isFetching, error }] =
    useLazySearchPropertiesQuery();

  const onSearch = (resetPage = false) => {
    const currentPage = resetPage ? 1 : page;

    if (resetPage) {
      setPage(1);
      setAllProperties([]);
      setHasMore(true);
    }

    triggerSearch({
      search: text,
      propertyType: filter,
      page: currentPage,
      pageSize: 9,
    });
  };

  const handleEndReached = () => {
    if (!isFetching && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    onSearch(true);
  }, [filter]);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllProperties(data.items);
      } else {
        setAllProperties(prev => [...prev, ...data.items]);
      }
      setHasMore(data.hasMore);
    }
  }, [data, page]);

  useEffect(() => {
    if (page > 1) {
      triggerSearch({
        search: text,
        propertyType: filter,
        page: page,
        pageSize: 9,
      });
    }
  }, [page]);

  const footer = isFetching ? (
    <View style={dynamicStyles.footerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  ) : !hasMore && allProperties.length > 0 ? (
    <View style={dynamicStyles.footerContainer}>
      <Text style={dynamicStyles.endText}>No more properties to load</Text>
    </View>
  ) : null;

  const header = (
    <>
      <SearchInput
        onPress={() => onSearch(true)}
        text={text}
        setText={setText}
      />
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
                color:
                  filter === 'land' ? Colors.primary : Colors.textSecondary,
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
                filter === 'commercial' ? Colors.primary : Colors.border,
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
                filter === 'residential' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('residential')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color:
                  filter === 'residential'
                    ? Colors.primary
                    : Colors.textSecondary,
              },
            ]}
          >
            Residential
          </Text>
        </Pressable>
      </View>
    </>
  );

  if (isLoading && page === 1) {
    return (
      <View style={dynamicStyles.container}>
        {header}
        <View style={dynamicStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={dynamicStyles.loadingText}>Loading properties...</Text>
        </View>
      </View>
    );
  }

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
              borderColor: filter === '' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color: filter === '' ? Colors.primary : Colors.textSecondary,
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
              borderColor: filter === 'land' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('land')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color:
                  filter === 'land' ? Colors.primary : Colors.textSecondary,
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
                filter === 'commercial' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('commercial')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color:
                  filter === 'commercial'
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
                filter === 'residential' ? Colors.primary : Colors.border,
            },
          ]}
          onPress={() => setFilter('residential')}
        >
          <Text
            style={[
              dynamicStyles.tagText,
              {
                color:
                  filter === 'residential'
                    ? Colors.primary
                    : Colors.textSecondary,
              },
            ]}
          >
            Residential
          </Text>
        </Pressable>
      </View>
      <PropertyListing
        data={allProperties}
        footer={footer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        style={{ backgroundColor: Colors.background }}
      />
    </View>
  );
};

export default Marketplace;
