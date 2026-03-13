import { View, Text, FlatList, Dimensions } from 'react-native';
import CardContainer2 from '@components/molecules/CardContainer2';
import Button from '@components/atoms/Button';
import useStyles from '@hooks/useStyles';
import useTheme from '@hooks/useTheme';
import { useAppNavigation } from '@hooks/useNavigation';
import { ROUTES } from 'src/navigation/constants';
import styles from './styles';
import EmptyState from '@components/molecules/EmptyState';
import { saveListedPropertiesDetails } from 'src/db/hooks/usePropertyDetails';
import { useEffect, useRef } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { throttle } from '@utils/utility';
import { PropertyCardProps } from '@utils/types';

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
  const { isConnected } = useNetInfo();

  // FIX 7 — previously the effect depended on items.length, so if the parent
  // re-rendered with the same number of items (but possibly different IDs or
  // updated data) the local save was skipped, leaving the DB stale.
  // We now depend on the actual item IDs so any change in the list triggers a
  // fresh save. We also track a ref to avoid firing on the very first render
  // before items are populated, which was the second cause of double-saves:
  // the effect fired once with an empty array, then again once items arrived,
  // but because length went 0→N both runs were treated as valid triggers.
  const savedIdsRef = useRef<string>('');

  const handleClicked = throttle((item: PropertyCardProps) => {
    console.log(item.status);
    return navigation.navigate(ROUTES.OWNED_PROPERTY, {
      id: item.id,
      status: item.status ?? undefined,
    });
  }, 500);

  useEffect(() => {
    if (!items.length || !isConnected) return;

    const currentIds = items
      .map(i => i.id)
      .sort()
      .join(',');

    // Skip if the exact same set of IDs was already saved in this session
    if (currentIds === savedIdsRef.current) return;

    savedIdsRef.current = currentIds;

    const propertyIds = items.map(item => item.id);
    saveListedPropertiesDetails(propertyIds);
  }, [items, isConnected]);

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
            onPress={() => navigation.navigate(ROUTES.LISTED_PROPERTIES)}
            title="View All"
          />
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
            <CardContainer2 {...item} userOwned onClick={() => handleClicked(item)} />
          </View>
        )}
      />
    </View>
  );
}
