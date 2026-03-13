import { View, Text, FlatList, Dimensions } from 'react-native';
import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';
import Button from '@components/atoms/Button';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import styles from './styles';
import EmptyState from '@components/molecules/EmptyState';
import { throttle } from '@utils/utility';
import { InvestmentCardType } from '@utils/types';

interface Props {
  items: any[];
  showViewAll: boolean;
}

export default function InvestedPropertiesSection({
  items,
  showViewAll,
}: Readonly<Props>) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  const handleClicked = throttle((item: InvestmentCardType) => {
    navigation.navigate(ROUTES.PROPERTY_DETAILS, {
      id: item.propertyId,
    });
  }, 300);

  return (
    <View
      style={[
        dynamicStyles.sectionCard,
        { backgroundColor: Colors.surface, borderColor: Colors.border },
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
            Your Property Portfolio
          </Text>
          <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>
            Active tokenized property holdings
          </Text>
        </View>
        {showViewAll ? (
          <Button
            size="sm"
            onPress={() => navigation.navigate(ROUTES.INVESTED_PROPERTIES)}
            title="View All"
          ></Button>
        ) : null}
      </View>
      <FlatList
        data={items}
        horizontal
        initialNumToRender={3}
        keyExtractor={item => item.propertyId.toString()}
        renderItem={({ item }) => (
          <View style={{ width: Dimensions.get('screen').width * 0.7 }}>
            <HoldingPropertyCard
              {...item}
              onClick={() => handleClicked(item)}
            />
          </View>
        )}
        ListEmptyComponent={<EmptyState message="No Investments Made yet" />}
        style={{ padding: 10 }}
        contentContainerStyle={dynamicStyles.flatListContainerStyle}
      />
    </View>
  );
}
