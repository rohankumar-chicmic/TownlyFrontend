import { View, Text, Image } from 'react-native'
import React from 'react'
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
    <Container>
      <Image src={props.imageUrl} height={250} ></Image>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingVertical: 10
      }}>
        <View>
          <Text style={dynamicStyles.heading}>{props.title}</Text>
          <View>
            <Text style={dynamicStyles.descriptionText}>
              <ICONS.Location width={10} height={10} borderColor={Colors.primary} /> {props.location}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[dynamicStyles.smallText, { fontSize: 18, paddingBottom: 8 }]} >
            {props.riskData.score}
          </Text>
          <Text style={[dynamicStyles.smallText, { paddingBottom: 8 }]} >
            {props.riskData.label}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
        <View>
          <Text style={dynamicStyles.smallText} >
            Price/Share
          </Text>
          <Text style={dynamicStyles.detailsText}>{props.pricing.pricePerShare} {props.pricing.currency}</Text>
        </View>
        <View>
          <Text style={dynamicStyles.smallText} >
            Availability
          </Text>
          <Text style={dynamicStyles.detailsText}>{props.pricing.availability}</Text>
        </View>
        <View>
          <Text style={dynamicStyles.smallText} >
            Estimated Yield
          </Text>
          <Text style={dynamicStyles.detailsText}>{props.yieldPercentage}</Text>
        </View>
      </View>


      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20}}>
        <Button title='Details' onPress={() => console.log('view details')} variant='outline'></Button>
        <Button title='Invest' onPress={() => console.log('invest')} ></Button>
      </View>
    </Container>
  )
}