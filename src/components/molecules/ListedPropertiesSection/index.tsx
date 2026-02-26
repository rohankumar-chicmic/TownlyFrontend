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

export default function ListedPropertiesSection({
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={[dynamicStyles.heading, { fontSize: 15 }]}>
            My Listed Properties
          </Text>
          <Text style={[dynamicStyles.smallText, { marginBottom: 10 }]}>
            Properties you&apos;ve created and tokenized
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
              onClick={() =>
                navigation.navigate(ROUTES.OWNED_PROPERTY, {
                  id: item.id,
                  status: item.status,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}
