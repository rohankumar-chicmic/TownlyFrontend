import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type PropertyDetailsRouteProp =
  RouteProp<RootStackParamList, 'PropertyDetails'>;


export const useAppRoute = () => useRoute<PropertyDetailsRouteProp>();

