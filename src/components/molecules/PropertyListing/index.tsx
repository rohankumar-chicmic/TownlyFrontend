import React from 'react';
import { View, Text, FlatList, ViewStyle } from 'react-native';
import CardContainer2 from '../CardContainer2';
import PropertyCardProps from '../CardContainer2/PropertyCardProps.type';

interface ListingProp {
  header?: React.ReactElement;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  horizontal?: boolean;
  data?: PropertyCardProps[];
}

export default function PropertyListing(props: ListingProp) {
  console.log(props.data);
  return (
    <FlatList
      horizontal={props.horizontal}
      data={props.data}
      contentContainerStyle={props.contentContainerStyle}
      style={props.style}
      keyExtractor={(item, index) => item.id}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.3}
      ListHeaderComponent={props.header}
      renderItem={({ item }) => <CardContainer2 {...item} />}
    />
  );
}
