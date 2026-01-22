import { View, Text, Image } from 'react-native';
import React from 'react';
import Container from '@components/atoms/Container';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import PropertyCardProps from './PropertyCardProps.type';
import Button from '@components/atoms/Button';

export default function CardContainer(props: Readonly<PropertyCardProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  return (
    <Container>
      <Image src={props.imageUrl} height={250}></Image>

      <View style={dynamicStyles.detailContainer}>
        <View
          style={{
            height: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottomWidth: 1,
            borderBottomColor: Colors.border,
          }}
        >
          <View style={dynamicStyles.titleContainer}>
            <Text style={dynamicStyles.heading}>{props.title}</Text>
            <Text style={dynamicStyles.locationText}>
              <Icons.Location
                width={12}
                height={12}
                borderColor={Colors.primary}
              />{' '}
              {props.location}
            </Text>
          </View>
          <View
            style={[dynamicStyles.titleContainer, { alignItems: 'flex-end' }]}
          >
            <Text style={[dynamicStyles.smallText]}>
              {props.riskData.score}
            </Text>
            <Text style={[dynamicStyles.smallText]}>
              {props.riskData.label}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
          }}
        >
          <View>
            <Text style={dynamicStyles.smallText}>Price/Share</Text>
            <Text style={dynamicStyles.detailsText}>
              {props.pricing.pricePerShare}
              {props.pricing.currency}
            </Text>
          </View>
          <View>
            <Text style={dynamicStyles.smallText}>Availability</Text>
            <Text style={dynamicStyles.detailsText}>
              {props.pricing.availability}
            </Text>
          </View>
          <View>
            <Text style={dynamicStyles.smallText}>Estimated Yield</Text>
            <Text style={dynamicStyles.detailsText}>
              {props.yieldPercentage}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
          }}
        >
          <Button
            title="Details"
            onPress={() => console.log('view details')}
            variant="outline"
          ></Button>
          <Button title="Invest" onPress={() => console.log('invest')}></Button>
        </View>
      </View>
    </Container>
  );
}
