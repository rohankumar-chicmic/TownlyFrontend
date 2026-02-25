import React, { useEffect, useMemo } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';

import Button from '@components/atoms/Button';
import CardContainer from '@components/molecules/CardContainer2';
import ListEmptyComponent from '@components/molecules/ListEmptyComponent';
import {
  useFeaturedProperties,
  saveFeaturedProperties,
} from 'src/db/hooks/useProperties';

import { Icons } from '@utils/icons';
import { ROUTES } from 'src/navigation/constants';
import { debounce } from '@utils/utility';

import { useGetFeaturedPropertiesQuery } from '@redux/PropertyApiReducer';
import { useNetInfo } from '@react-native-community/netinfo';

const Home = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const { isConnected } = useNetInfo();
  const { data, isLoading, error, refetch } = useGetFeaturedPropertiesQuery(
    undefined,
    {
      skip: !isConnected,
    },
  );

  useEffect(() => {
    if (data && !error) {
      saveFeaturedProperties(data);
    }
  }, [data, error]);

  const { data: localData } = useFeaturedProperties();
  console.log(data);
  const header = useMemo(
    () => (
      <>
        {/* Hero Section */}
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

        {/* CTA Button */}
        <Button
          title="Explore Marketplace"
          style={{ marginBottom: 5 }}
          textStyle={{ margin: 10 }}
          size="lg"
          // onPress={handleClick}
          onPress={() => navigation.navigate(ROUTES.MARKETPLACE)}
        >
          <Icons.Arrow
            height={15}
            width={15}
            borderColor={Colors.background}
            color={Colors.background}
          />
        </Button>

        {/* Stats */}
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
            <Text style={[dynamicStyles.smallText, { width: 110 }]}>
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

  const handlePressed = (id: string) => {
    navigation.push(ROUTES.PROPERTY_DETAILS, { id: id });
  };

  const debouncedHandlePressed = debounce(handlePressed, 250);

  if (isLoading && !data) {
    return (
      <ScrollView style={dynamicStyles.container}>
        {header}
        <Text style={[dynamicStyles.heroPrimarytext, { alignSelf: 'center' }]}>
          Loading Properties...
        </Text>
      </ScrollView>
    );
  }

  /**
   * Main List (Replaces PropertyListing)
   */
  return (
    <FlatList
      data={localData}
      ListHeaderComponent={header}
      contentContainerStyle={[{ gap: 10 }, dynamicStyles.container]}
      style={{ backgroundColor: Colors.background }}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <CardContainer
          {...item}
          onClick={() => debouncedHandlePressed(item.id)}
        />
      )}
      ListEmptyComponent={isLoading ? null : <ListEmptyComponent />}
      refreshing={isLoading}
      onRefresh={refetch}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Home;
