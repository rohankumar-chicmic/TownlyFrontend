import { View, Text, FlatList, Dimensions } from 'react-native';
import CardContainer2 from '@components/molecules/CardContainer2';
import Button from '@components/atoms/Button';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import styles from './styles';
import EmptyState from '@components/molecules/EmptyState';

const CARD_WIDTH = Dimensions.get('window').width * 0.75;

interface Props {
  items: any[];
  showViewAll: boolean;
}

export default function ListedPropertiesSection({ items, showViewAll }: Props) {
  const { dynamicStyles } = useStyles(styles);
  const { Colors } = useTheme();
  const navigation = useAppNavigation();

  return (
    <View style={[dynamicStyles.sectionCard, { backgroundColor: Colors.surface, borderColor: Colors.border }]}>
      <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>My Listed Properties</Text>
      <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>Properties you've created and tokenized</Text>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={items}
        horizontal
        contentContainerStyle={dynamicStyles.flatListContainerStyle}
        ListEmptyComponent={<EmptyState message="No Properties Here" />}
        style={{ width: '100%', padding: 8 }}
        renderItem={({ item }) => (
          <View style={{ width: CARD_WIDTH }}>
            <CardContainer2
              {...item}
              userOwned
              onClick={() => navigation.navigate(ROUTES.OWNED_PROPERTY, { id: item.id, status: item.status })}
            />
          </View>
        )}
        ListFooterComponent={() =>
          showViewAll ? (
            <View style={[dynamicStyles.viewAllContainer, { width: Dimensions.get('screen').width * 0.5 }]}>
              <Button title="View All" onPress={() => navigation.navigate(ROUTES.LISTED_PROPERTIES)} />
            </View>
          ) : null
        }
      />
    </View>
  );
}