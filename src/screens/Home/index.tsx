import React, { useMemo } from 'react';
import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';

import styles from './styles';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';

import Button from '@components/atoms/Button';
import CardContainer from '@components/molecules/CardContainer2';
import ListEmptyComponent from '@components/molecules/PropertyListing/ListEmptyComponent';

import { Icons } from '@utils/icons';
import { ROUTES } from 'src/navigation/constants';

import { useGetFeaturedPropertiesQuery } from '@redux/PropertyApiReducer';

const Home = () => {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  const { data, isLoading, error, refetch } = useGetFeaturedPropertiesQuery();

  /**
   * Memoized Header — prevents full FlatList re-render
   */
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
            height={12}
            width={12}
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

        {/* Section Heading */}
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

  /**
   * Loading State
   */
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
   * Error State
   */
  if (error) {
    console.warn(error);

    return (
      <ScrollView style={dynamicStyles.container}>
        {header}
        <Text
          style={[
            dynamicStyles.heroPrimarytext,
            {
              textAlign: 'center',
              height: Dimensions.get('screen').height * 0.3,
            },
          ]}
        >
          Sorry, could not fetch the properties
        </Text>
      </ScrollView>
    );
  }

  /**
   * Main List (Replaces PropertyListing)
   */
  return (
    <FlatList
      data={data ?? []}
      ListHeaderComponent={header}
      contentContainerStyle={[{ gap: 10 }, dynamicStyles.container]}
      style={{ backgroundColor: Colors.background }}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CardContainer {...item} />}
      ListEmptyComponent={isLoading ? null : <ListEmptyComponent />}
      refreshing={isLoading}
      onRefresh={refetch}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Home;
