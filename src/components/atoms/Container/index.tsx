import { View } from 'react-native';
import React from 'react';
import useStyles from '@hooks/useStyles';
import styles from './styles';

interface ContainerProps {
  children: React.ReactNode;
  style?: any;
}

export default function Container(props: Readonly<ContainerProps>) {
  const { dynamicStyles } = useStyles(styles);
  return (
    <View style={[dynamicStyles.container, props.style]}>{props.children}</View>
  );
}
