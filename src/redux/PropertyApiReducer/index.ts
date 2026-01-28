import api from '@redux/store/api';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import { PropertyDetailsType } from '@utils/types';
const propertyApi = api.injectEndpoints({
  endpoints: builder => ({
    getFeaturedProperties: builder.query<PropertyCardProps[], void>({
      query: () => ({
        url: '/properties/featured',
        method: 'GET',
      }),
    }),
    getPropertyDetails: builder.query<PropertyDetailsType, string>({
      query: id => ({
        url: `/properties/${id}`,
        method: 'GET',
      }),
    }),
    searchProperties: builder.query<
      { hasMore: boolean; items: PropertyCardProps[] },
      { search: string; propertyType: string }
    >({
      query: ({ search, propertyType }) => ({
        url: `/properties/marketplace?page=1&pageSize=9&search=${search}&propertyType=${propertyType}`,
        method: 'GET',
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetFeaturedPropertiesQuery,
  useGetPropertyDetailsQuery,
  useLazySearchPropertiesQuery,
} = propertyApi;

export { propertyApi };
