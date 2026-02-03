import React from 'react';
import { View, Text, FlatList, ViewStyle } from 'react-native';
import CardContainer2 from '../CardContainer2';
import PropertyCardProps from '../CardContainer2/PropertyCardProps.type';
import useTheme from '@hooks/useTheme';
import { DUMMY_PROPERTIES } from '@screens/PropertyDetails/dummyData';

interface ListingProp {
  header?: React.ReactElement;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  horizontal?: boolean;
  data?: PropertyCardProps[];
}

export default function PropertyListing(props: Readonly<ListingProp>) {
  console.log(props.data);
  const {Colors} = useTheme();
  return (
    <>
      <FlatList
      horizontal={props.horizontal}
      data={props.data ?? DUMMY_PROPERTIES}
      contentContainerStyle={props.contentContainerStyle}
      style={props.style}
      keyExtractor={(item, index) => item.id}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.3}
      ListHeaderComponent={props.header}
      renderItem={({ item }) => <CardContainer2 {...item} />}
      />
    </>
  );
}
