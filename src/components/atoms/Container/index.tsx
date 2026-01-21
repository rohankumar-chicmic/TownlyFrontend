import { View, Text, StyleSheet } from 'react-native';
import React, { Children } from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';

interface ContainerProps {
  children: React.ReactNode;
  style?: any;
}

export default function Container(props: ContainerProps) {
  const { dynamicStyles, Colors } = useStyles(styles);
  return (
    <View style={[dynamicStyles.container, { ...props.style }]}>
      {props.children}
    </View>
  );
}
