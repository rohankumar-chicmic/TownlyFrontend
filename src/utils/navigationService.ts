import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
let pendingNavigation: { name: any; params?: any } | null = null;

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export function navigate(name: string, params?: any) {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.navigate(name, params);
  } else {
    pendingNavigation = { name, params };
  }
}

export function flushPendingNavigation() {
  if (pendingNavigation && navigationRef.current?.isReady()) {
    navigationRef.current.navigate(
      pendingNavigation.name,
      pendingNavigation.params,
    );
    pendingNavigation = null;
  }
}
