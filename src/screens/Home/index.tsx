import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';

import useStyles from '@hooks/useStyles';

import Button from '@components/atoms/Button';

import useTheme from '@hooks/useTheme';
import { ROUTES } from 'src/navigation/constants';
import { Icons } from '@utils/icons';
import { useAppNavigation } from '@hooks/useNavigation';
import PropertyListing from '@components/molecules/PropertyListing';

const Home = () => {
  const { dynamicStyles } = useStyles(styles);
  const navigation = useAppNavigation();
  const { Colors } = useTheme();

  const header = (
    <>
      <View>
        <Text style={[dynamicStyles.heroPrimarytext]}>
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
          Global access to premium real estate. Own fractions, earn weekly rent
          distributions, and trade with transparency.
        </Text>
      </View>
      {/* <Button title="Toggle theme" onPress={toggleTheme}></Button> */}
      <Button
        title="Explore Marketplace"
        style={{ marginBottom: 5 }}
        textStyle={{ margin: 10 }}
        size="lg"
        onPress={() => navigation.navigate(ROUTES.MARKETPLACE)}
      >
        {<Icons.Arrow height={12} width={12} borderColor={Colors.background} />}
      </Button>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          flex: 1,
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
          <Text style={[dynamicStyles.smallText, { width: 80 }]}>
            Customer Satifaction
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
        <View style={[dynamicStyles.containerStyle]}>
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
        <Text style={dynamicStyles.smallText}>
          Explore our latest tokenized real estate opportunities
        </Text>
      </View>
    </>
  );

  return (
    <PropertyListing
      header={header}
      contentContainerStyle={dynamicStyles.container}
      style={{ backgroundColor: Colors.background }}
    />
  );
};
export default Home;
