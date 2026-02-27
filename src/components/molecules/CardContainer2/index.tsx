import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import { PropertyCardProps } from '@utils/types';
import FastImage from 'react-native-fast-image';

import Badge from '@components/atoms/Badge';

export default function CardContainer2(props: Readonly<PropertyCardProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={props.onClick}
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
        <FastImage
          source={{
            uri: props.imageUrl,
          }}
          style={{
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
            height: '100%',
          }}
        ></FastImage>
      </View>

      {props.userOwned && props.status && <Badge status={props.status} />}

      <View style={dynamicStyles.detailsContainer}>
        <Text numberOfLines={1} style={dynamicStyles.title}>
          {props.name}
        </Text>
        <Text style={dynamicStyles.location} numberOfLines={1}>
          <Icons.Location width={10} height={10} borderColor={Colors.primary} />{' '}
          {props.location}
        </Text>

        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields}>Final Risk Score</Text>
          <Text style={[dynamicStyles.values]}>
            {props.riskScore}
            {'/10'}
          </Text>
        </View>

        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields}>Estimated Yield</Text>
          <Text style={[dynamicStyles.values]}>
            {props.annualYieldPercent}
            {'%'}
          </Text>
        </View>
        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields}>Availability</Text>
          <Text style={[dynamicStyles.values, { color: Colors.primary }]}>
            {props.availableUnits}
          </Text>
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
