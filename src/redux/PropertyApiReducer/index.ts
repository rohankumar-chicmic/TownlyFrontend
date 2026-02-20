import api from '@redux/store/api';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import { NFTFormData } from '@screens/CreateNFT/types';
import { PropertyDetailsType } from '@utils/types';

const propertyApi = api.injectEndpoints({
  endpoints: builder => ({
    // Create Property
    makeProperty: builder.mutation<
      PropertyDetailsType,
      { data: NFTFormData; token: string }
    >({
      query: ({ data, token }) => {
        const formData = new FormData();

        // Append basic fields with safe defaults
        formData.append('Name', data.propertyName ?? '');
        formData.append('Description', data.description ?? '');
        formData.append('Location', data.location ?? '');
        formData.append('PropertyType', data.propertyType ?? '');
        formData.append(
          'InitialValuation',
          (data.totalPropertyValue ?? 0).toString(),
        );
        formData.append('TotalUnits', (data.numberOfShares ?? 0).toString());
        formData.append('rentalIncome', (data.rentalIncome ?? 0).toString());
        formData.append(
          'AnnualYieldPercent',
          (data.expectedAnnualYield ?? 0).toString(),
        );

        // Append property image
        if (data.propertyImage?.uri) {
          formData.append('Image', {
            uri: data.propertyImage.uri,
            name: data.propertyImage.name ?? 'image.jpg',
            type: data.propertyImage.type ?? 'image/jpeg',
          } as any);
        }

        // Append documents safely
        data.documents?.forEach((doc, idx) => {
          if (doc.file?.uri) {
            formData.append(`Documents[${idx}]`, {
              uri: doc.file.uri,
              name: doc.file.name ?? `doc_${idx}.pdf`,
              type: doc.file.type ?? 'application/pdf',
            } as any);
          }
          formData.append(
            `Documents[${idx}][documentName]`,
            doc.documentName ?? '',
          );
        });

        return {
          url: '/properties',
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getMyProperties: builder.query({
      query: params => ({
        url: `/properties/me`,
        method: 'GET',
        params,
      }),
    }),

    getMyInvestedProperties: builder.query({
      query: params => ({
        url: `/investments/me`,
        method: 'GET',
        params,
      }),
    }),

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

    getMyPropertyDetails: builder.query<PropertyDetailsType, string>({
      query: id => ({
        url: `/properties/me/${id}`,
        method: 'GET',
      }),
    }),

    searchProperties: builder.query<
      { hasMore: boolean; items: PropertyCardProps[] },
      { search: string; propertyType: string; page: number; pageSize: number }
    >({
      query: params => ({
        url: `/properties/marketplace`,
        method: 'GET',
        params,
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search}-${queryArgs.propertyType}`;
      },

      // 2. Decide how to update the cache when new data arrives
      merge: (currentCache, newItemData, { arg }) => {
        if (arg.page === 1) {
          // If the user started a new search or changed a filter (page 1),
          // throw away the old list and start fresh.
          return newItemData;
        }
        // If it's page 2, 3, etc., append the items to the existing list.
        currentCache.items.push(...newItemData.items);
        currentCache.hasMore = newItemData.hasMore;
      },

      // 3. Ensure that changing the page number actually triggers a network request
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getRelatedProperties: builder.query({
      query: propertyId => ({
        url: `/properties/${propertyId}/related`,
        method: 'GET',
      }),
    }),

    editProperty: builder.mutation({
      query: body => ({
        url: `/properties/${body.propertyId}/update-request`,
        method: 'POST',
        body: body,
      }),
    }),

    investInProperty: builder.mutation<
      void,
      { propertyId: string; shares: number }
    >({
      query: body => ({
        url: '/investments',
        method: 'POST',
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useMakePropertyMutation,
  useGetFeaturedPropertiesQuery,
  useGetPropertyDetailsQuery,
  useSearchPropertiesQuery,
  useGetRelatedPropertiesQuery,
  useInvestInPropertyMutation,
  useLazyGetMyPropertiesQuery,
  useLazyGetMyInvestedPropertiesQuery,
  useEditPropertyMutation,
  useGetMyPropertyDetailsQuery,
} = propertyApi;

export { propertyApi };
