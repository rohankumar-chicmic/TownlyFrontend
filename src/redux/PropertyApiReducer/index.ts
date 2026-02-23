import api from '@redux/store/api';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import { NFTFormData } from '@screens/CreateNFT/types';
import { MyPropertyDetailsType, PropertyDetailsType } from '@utils/types';

const propertyApi = api.injectEndpoints({
  endpoints: builder => ({
    makeProperty: builder.mutation<
      PropertyDetailsType,
      { data: NFTFormData; token: string }
    >({
      query: ({ data, token }) => {
        const formData = new FormData();

        formData.append('Name', data.propertyName ?? '');
        formData.append('Description', data.description ?? '');
        formData.append('Location', data.location ?? '');
        formData.append('PropertyType', data.propertyType ?? '');
        formData.append('InitialValuation', (data.totalPropertyValue ?? 0).toString());
        formData.append('TotalUnits', (data.numberOfShares ?? 0).toString());
        formData.append('rentalIncome', (data.rentalIncome ?? 0).toString());
        formData.append('AnnualYieldPercent', (data.expectedAnnualYield ?? 0).toString());

        if (data.propertyImage?.uri) {
          formData.append('Image', {
            uri: data.propertyImage.uri,
            name: data.propertyImage.name ?? 'image.jpg',
            type: data.propertyImage.type ?? 'image/jpeg',
          } as any);
        }

        data.documents?.forEach((doc, idx) => {
          if (doc.file?.uri) {
            formData.append(`Documents[${idx}]`, {
              uri: doc.file.uri,
              name: doc.file.name ?? `doc_${idx}.pdf`,
              type: doc.file.type ?? 'application/pdf',
            } as any);
          }
          formData.append(`Documents[${idx}][documentName]`, doc.documentName ?? '');
        });

        return {
          url: '/properties',
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: ['MyProperties'],
    }),

    getMyProperties: builder.query<
      { hasMore: boolean; items: PropertyCardProps[] },
      { page: number; pageSize: number; status: string | number; search: string }
    >({
      query: params => ({
        url: `/properties/me`,
        method: 'GET',
        params,
      }),
      providesTags: ['MyProperties'],

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.pageSize}-${queryArgs.status}-${queryArgs.search}`;
      },

      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.items.push(...newData.items);
        currentCache.hasMore = newData.hasMore;
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.pageSize !== previousArg?.pageSize ||
          currentArg?.status !== previousArg?.status ||
          currentArg?.search !== previousArg?.search
        );
      },
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

      merge: (currentCache, newItemData, { arg }) => {
        if (arg.page === 1) return newItemData;
        currentCache.items.push(...newItemData.items);
        currentCache.hasMore = newItemData.hasMore;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getMyInvestedProperties: builder.query<
      { hasMore: boolean; items: PropertyCardProps[] },
      { search: string; propertyType: string; page: number; pageSize: number }
    >({
      query: params => ({
        url: `/investments/me`,
        method: 'GET',
        params,
      }),
      providesTags: ['MyInvestedProperties'],

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search}-${queryArgs.propertyType}-${queryArgs.pageSize}`;
      },

      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.items.push(...newData.items);
        currentCache.hasMore = newData.hasMore;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getFeaturedProperties: builder.query<PropertyCardProps[], void>({
      query: () => ({ url: '/properties/featured', method: 'GET' }),
    }),

    getPropertyDetails: builder.query<PropertyDetailsType, string>({
      query: id => ({ url: `/properties/${id}`, method: 'GET' }),
    }),

    // No providesTags here — we don't want RTK Query to ever
    // auto-refetch this after deleteProperty invalidates tags,
    // which would hit the backend for a resource that no longer exists.
    getMyPropertyDetails: builder.query<MyPropertyDetailsType, string>({
      query: id => ({ url: `/properties/me/${id}`, method: 'GET' }),
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
        body,
      }),
      invalidatesTags: ['MyProperties'],
    }),

    investInProperty: builder.mutation<
      void,
      { propertyId: string; shares: number }
    >({
      query: body => ({ url: '/investments', method: 'POST', body }),
      invalidatesTags: ['MyInvestedProperties'],
    }),

    // FIX: only invalidate MyProperties (the list).
    // Removed { type: 'MyPropertyDetail', id } from invalidatesTags —
    // that was causing RTK Query to refetch getMyPropertyDetails for the
    // deleted property, which returned a 500 from the backend.
    deleteProperty: builder.mutation<void, string>({
      query: propertyId => ({
        url: `/properties/${propertyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyProperties'],
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
  useGetMyPropertiesQuery,
  useGetMyInvestedPropertiesQuery,
  useEditPropertyMutation,
  useGetMyPropertyDetailsQuery,
  useDeletePropertyMutation,
} = propertyApi;

export { propertyApi };