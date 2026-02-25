import { View, Text, FlatList, Dimensions } from 'react-native';
import HoldingPropertyCard from '@components/molecules/HoldingPropertyCard';
import Button from '@components/atoms/Button';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import styles from './styles';
import EmptyState from '@components/molecules/EmptyState';

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

  return (
    <View
      style={[
        dynamicStyles.sectionCard,
        { backgroundColor: Colors.surface, borderColor: Colors.border },
      ]}
    >
      <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
        Your Property Portfolio
      </Text>
      <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>
        Active tokenized property holdings
      </Text>
      <FlatList
        data={items}
        horizontal
        initialNumToRender={3}
        keyExtractor={item => item.propertyId.toString()}
        renderItem={({ item }) => (
          <View style={{ width: Dimensions.get('screen').width * 0.7 }}>
            <HoldingPropertyCard {...item} />
          </View>
        )}
        ListEmptyComponent={<EmptyState message="No Investments Made yet" />}
        style={{ padding: 10 }}
        contentContainerStyle={dynamicStyles.flatListContainerStyle}
        ListFooterComponent={() =>
          showViewAll ? (
            <View style={dynamicStyles.viewAllContainer}>
              <Button
                onPress={() => navigation.navigate(ROUTES.INVESTED_PROPERTIES)}
                title="View All"
              />
            </View>
          ) : null
        }
      />
    </View>
  );
}
