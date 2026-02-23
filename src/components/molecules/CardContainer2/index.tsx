import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import PropertyCardProps from './PropertyCardProps.type';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import Badge from '@components/atoms/Badge';
import { debounce } from '@utils/utility';

export default function CardContainer2(props: Readonly<PropertyCardProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const handlePressed = () => {
    if (props.onClick) {
      props.onClick();
      return;
    }
    navigation.push(ROUTES.PROPERTY_DETAILS, { id: props.id });
  };

  const debouncedHandlePressed = debounce(handlePressed, 250);

  return (
    <Pressable
      onPress={debouncedHandlePressed}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        dynamicStyles.container,
        {
          backgroundColor: isPressed ? Colors.background : Colors.surface,
        },
      ]}
    >
      <View style={{ width: '40%' }}>
        <Image
          source={{
            uri: props.imageUrl,
          }}
          style={{
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
            height: '100%',
          }}
        ></Image>
      </View>

      {props.userOwned && props.status && <Badge status={props.status}/>}

      <View style={dynamicStyles.detailsContainer}>
        <Text numberOfLines={1} style={dynamicStyles.title}>
          {props.name}
        </Text>
        <Text style={dynamicStyles.location} numberOfLines={1}>
          <Icons.Location width={10} height={10} borderColor={Colors.primary} />{' '}
          {props.location}
        </Text>

        <Text
          style={[
            dynamicStyles.smallText,
            {
              color: Colors.textPrimary,
              justifyContent: 'space-between',
            },
          ]}
        >
          <Text style={dynamicStyles.smallText}>Final risk Score: </Text>
          {props.riskScore ?? 0}
          {'/10 '}
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
