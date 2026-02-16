import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import PropertyCardProps from './PropertyCardProps.type';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';

export default function CardContainer2(props: Readonly<PropertyCardProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const handlePressed = () => {
    navigation.push(ROUTES.PROPERTY_DETAILS, { id: props.id });
  };

  return (
    <Pressable
      onPress={handlePressed}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        dynamicStyles.container,
        {
          backgroundColor: isPressed ? Colors.background : Colors.surface,
        },
      ]}
    >
      <Image
        src={props.imageUrl}
        width={Dimensions.get('screen').width * 0.4}
        style={{ borderBottomLeftRadius: 7, borderTopLeftRadius: 7 }}
      ></Image>

      <View style={dynamicStyles.detailsContainer}>
        <Text numberOfLines={3} style={dynamicStyles.title}>
          {props.name}{' '}
        </Text>
        <Text style={dynamicStyles.location} numberOfLines={2}>
          <Icons.Location width={10} height={10} borderColor={Colors.primary} />{' '}
          {props.location}
        </Text>

        <Text
          style={[
            dynamicStyles.smallText,
            {
              color: Colors.textPrimary,
            },
          ]}
        >
          {props.riskScore ?? 0}
          {'/10 '}
          {/* <Text style={[dynamicStyles.smallText]}>
              {props.riskData.label}
            </Text> */}
        </Text>

        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields}>Estimated Yield</Text>
          <Text style={[dynamicStyles.values]}>
            {props.annualYieldPercent}
            {'%'}
          </Text>
        </View>
        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields}>Availability</Text>
          <Text style={[dynamicStyles.values]}>{props.availableUnits}</Text>
        </View>
        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields}>Price/Share</Text>
          <Text style={[dynamicStyles.values]}>
            {Number(props.pricePerUnitEth ?? 1.5).toFixed(2)} {'ETH'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
