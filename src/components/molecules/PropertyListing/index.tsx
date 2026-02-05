import React from 'react';
import { FlatList, View, ViewStyle } from 'react-native';
import CardContainer from '@components/molecules/CardContainer2';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';

interface PropertyListingProps {
  data?: PropertyCardProps[];
  header?: React.ReactElement;
  footer?: React.ReactElement | null;
  contentContainerStyle?: ViewStyle;
  horizontal?: boolean;
  style?: any;
  EmptyComponent?: React.ReactElement;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

const PropertyListing = ({
  data,
  header,
  footer,
  contentContainerStyle,
  style,
  EmptyComponent,
  onEndReached,
  horizontal,
  onEndReachedThreshold = 0.5,
}: PropertyListingProps) => {
  return (
    <FlatList
      data={data}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      contentContainerStyle={[contentContainerStyle]}
      style={style}
      horizontal={horizontal}
      ListEmptyComponent={() => EmptyComponent ? <EmptyComponent /> : <></>}
      renderItem={({ item }) => <CardContainer {...item} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
};

export default PropertyListing;
