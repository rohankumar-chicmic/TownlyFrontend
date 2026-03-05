import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';

import Button from '@components/atoms/Button';
import CardContainer from '@components/molecules/CardContainer2';
import CardContainer2Skeleton from '@components/molecules/CardContainerSkeleton';
import ListEmptyComponent from '@components/molecules/ListEmptyComponent';
import {
  useFeaturedProperties,
  saveFeaturedProperties,
} from 'src/db/hooks/useProperties';

import { Icons } from '@utils/icons';
import { ROUTES } from 'src/navigation/constants';
import { throttle } from '@utils/utility';

import { useGetFeaturedPropertiesQuery } from '@redux/PropertyApiReducer';
import { useNetInfo } from '@react-native-community/netinfo';

const SKELETON_COUNT = 4;

const Home = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const { isConnected } = useNetInfo();

  const skipFetch = !isConnected || isConnected === null;

  const { data, isLoading, error, refetch } = useGetFeaturedPropertiesQuery(
    undefined,
    { skip: skipFetch },
  );

  useEffect(() => {
    if (data && !error) {
      saveFeaturedProperties(data);
    }
  }, [data, error]);

  const { data: localData } = useFeaturedProperties();

  const header = useMemo(
    () => (
      <>
        <View>
          <Text style={dynamicStyles.heroPrimarytext}>
            Fractional, Tokenized
          </Text>
          <Text
            style={[dynamicStyles.heroPrimarytext, { color: Colors.primary }]}
          >
            Real Estate Investing
          </Text>
        </View>

        <View>
          <Text style={dynamicStyles.heroText}>
            Global access to premium real estate. Own fractions, earn weekly
            rent distributions, and trade with transparency.
          </Text>
        </View>

        <Button
          title="Explore Marketplace"
          style={{ marginBottom: 5 }}
          textStyle={{ margin: 10 }}
          size="lg"
          onPress={() => navigation.navigate(ROUTES.MARKETPLACE)}
        >
          <Icons.Arrow
            height={10}
            width={10}
            borderColor={Colors.background}
            color={Colors.background}
          />
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          <View style={dynamicStyles.containerStyle}>
            <Text
              style={[
                dynamicStyles.heroPrimarytext,
                { fontSize: 25, color: Colors.primary },
              ]}
            >
              99%
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 90 }]}>
              Customer Satisfaction
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text
              style={[
                dynamicStyles.heroPrimarytext,
                { fontSize: 25, color: Colors.primary },
              ]}
            >
              50M+
            </Text>
            <Text style={[dynamicStyles.smallText, { width: 95 }]}>
              In property Sales
            </Text>
          </View>
          <View style={dynamicStyles.containerStyle}>
            <Text
              style={[
                dynamicStyles.heroPrimarytext,
                { fontSize: 25, color: Colors.primary },
              ]}
            >
              2,600+
            </Text>
            <Text style={[dynamicStyles.smallText, { width: '100%' }]}>
              Successful Sales
            </Text>
          </View>
        </View>

        <View style={dynamicStyles.headingSection}>
          <Text style={dynamicStyles.heading}>Featured Properties</Text>
          <Text style={[dynamicStyles.smallText, { textAlign: 'center' }]}>
            Explore our latest tokenized real estate opportunities
          </Text>
        </View>
      </>
    ),
    [Colors, dynamicStyles, navigation],
  );

  const handlePressed = (item: any) => {
    navigation.push(ROUTES.PROPERTY_DETAILS, { item });
  };

  const throttledHandlePressed = throttle(handlePressed, 300);

  const showSkeleton = isLoading && !localData?.length;

  return (
    <FlatList
      data={
        showSkeleton
          ? (new Array(SKELETON_COUNT).fill(null) as null[])
          : localData
      }
      ListHeaderComponent={header}
      contentContainerStyle={[{ gap: 10 }, dynamicStyles.container]}
      style={{ backgroundColor: Colors.background }}
      keyExtractor={(item, index) =>
        item ? item.id.toString() : `skeleton-${index}`
      }
      renderItem={({ item, index }) =>
        showSkeleton || !item ? (
          <CardContainer2Skeleton key={`skeleton-${index}`} />
        ) : (
          <CardContainer
            {...item}
            onClick={() => throttledHandlePressed(item)}
          />
        )
      }
      ListEmptyComponent={<ListEmptyComponent />}
      refreshing={isLoading}
      onRefresh={refetch}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Home;
