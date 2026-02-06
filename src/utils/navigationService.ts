// navigationService.ts
import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  if (navigationRef.current?.isReady()) {
    navigationRef.current.navigate(name, params);
  }
}
