import React from 'react'
import { View, Text, FlatList, ViewStyle } from 'react-native'
import { DUMMY_PROPERTIES } from './dummyData'
import CardContainer2 from '../CardContainer2'

interface ListingProp {
  header?: React.ReactElement;
  contentContainerStyle?: ViewStyle, 
  style?: ViewStyle, 
  horizontal? : boolean
}

export default function PropertyListing(props: ListingProp) {
  return (
    <FlatList
      horizontal = {props.horizontal}
      data={DUMMY_PROPERTIES}
      contentContainerStyle={props.contentContainerStyle}
      style={props.style}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.3}
      ListHeaderComponent={props.header}
      renderItem={({ item }) => <CardContainer2 {...item} />}
    />
  )
}