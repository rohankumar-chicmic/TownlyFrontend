import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';
import { Icons } from '@utils/icons';
import useTheme from '@hooks/useTheme';
import { PropertyCardProps } from '@utils/types';
import FastImage from 'react-native-fast-image';

import Badge from '@components/atoms/Badge';
import useImages from '@hooks/useImages';

export default function CardContainer2(props: Readonly<PropertyCardProps>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();

  const [isPressed, setIsPressed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const Images = useImages();

  const imageSource =
    !props.imageUrl || imageError ? Images.FALLBACK : { uri: props.imageUrl };

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
      <View style={{ width: '40%', minHeight: 140 }}>
        <FastImage
          source={imageSource}
          defaultSource={Images.FALLBACK}
          onError={() => setImageError(true)}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
            height: '100%',
            width: '100%',
          }}
        />
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
          <Text style={dynamicStyles.fields} numberOfLines={1}>
            Final Risk Score
          </Text>
          <Text style={dynamicStyles.values}>
            {props.riskScore ? props.riskScore + '/10' : 'NA'}
          </Text>
        </View>

        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields} numberOfLines={1}>
            Estimated Yield
          </Text>
          <Text style={dynamicStyles.values}>{props.annualYieldPercent}%</Text>
        </View>

        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields} numberOfLines={1}>
            Availability
          </Text>
          <Text style={[dynamicStyles.values, { color: Colors.primary }]}>
            {props.availableUnits}
          </Text>
        </View>

        <View style={dynamicStyles.column}>
          <Text style={dynamicStyles.fields} numberOfLines={1}>
            Price/Share
          </Text>
          <Text style={dynamicStyles.values}>
            {Number(props.pricePerUnitEth ?? 1.5).toFixed(2)}
            <Text style={[dynamicStyles.values, { fontSize: 10 }]}> ETH</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
