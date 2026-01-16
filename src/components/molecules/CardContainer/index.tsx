import { View, Text, Image } from 'react-native'
import React from 'react'
import Container from '@components/atoms/Container';

export default function CardContainer() {
  return (
    <Container>
        <Image src='https://c.animaapp.com/mkdtyv4xh54UmA/img/mask-group-5.png' style={{
            height: 100, 
            width:'100%',

        }}></Image>
        <Text>Rohan</Text>
    </Container>
  )
}