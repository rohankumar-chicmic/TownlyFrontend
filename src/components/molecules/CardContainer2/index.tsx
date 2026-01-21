import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import Container from '@components/atoms/Container';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { ICONS } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import PropertyCardProps from './PropertyCardProps.type';
import Button from '@components/atoms/Button';

export default function CardContainer(props: PropertyCardProps) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  return (
    <Container
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        height: Dimensions.get('screen').height * 0.25,
        marginBottom: 15,
        width: Dimensions.get('screen').width * 0.9,
      }}
    >
      <Image
        src={props.imageUrl}
        width={Dimensions.get('screen').width * 0.33}
        style={{ borderBottomLeftRadius: 7, borderTopLeftRadius: 7 }}
      ></Image>

      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.titleContainer}>
          <View style={[]}>
            <Text numberOfLines={3} style={dynamicStyles.title}>
              {props.title}{' '}
            </Text>
            <Text style={dynamicStyles.location} numberOfLines={2}>
              <ICONS.Location
                width={12}
                height={12}
                borderColor={Colors.primary}
              />{' '}
              {props.location}
            </Text>
          </View>
          <View
            style={[
              {
                width: '70%',
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text
              style={[
                dynamicStyles.fields,
                {
                  color: Colors.textPrimary,
                },
              ]}
            >
              {props.riskData.score}
            </Text>
            <Text style={[dynamicStyles.smallText]}>
              {props.riskData.label}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            height: '40%',
          }}
        >
          <View style={dynamicStyles.column}>
            <Text style={dynamicStyles.fields}>Estimated Yield</Text>
            <Text style={[dynamicStyles.values]}>{props.yieldPercentage}</Text>
          </View>
          <View style={dynamicStyles.column}>
            <Text style={dynamicStyles.fields}>Availability</Text>
            <Text style={[dynamicStyles.values]}>
              {props.pricing.availability}
            </Text>
          </View>
          <View style={dynamicStyles.column}>
            <Text style={dynamicStyles.fields}>Price/Share</Text>
            <Text style={[dynamicStyles.values]}>
              {props.pricing.pricePerShare} {props.pricing.currency}
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
}
