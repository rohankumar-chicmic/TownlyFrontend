import api from '@redux/store/api';
import { NFTFormData } from '@screens/CreateNFT/types';
import {
  MyPropertyDetailsType,
  PropertyDetailsType,
  PropertyCardProps,
} from '@utils/types';

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

        if (data.propertyImage?.uri) {
          formData.append('Image', {
            uri: data.propertyImage.uri,
            name: data.propertyImage.name ?? 'image.jpg',
            type: data.propertyImage.type ?? 'image/jpeg',
          } as any);
        }

        data.documents?.forEach((doc, idx) => {
          if (doc.file?.uri) {
            formData.append(`Documents[${idx}].File`, {
              uri: doc.file.uri,
              name: doc.file.name ?? `doc_${idx}.pdf`,
              type: doc.file.type ?? 'application/pdf',
            } as any);
          }

          formData.append(`Documents[${idx}].Title`, doc.documentName ?? '');
        });

        console.log(data?.documents);
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
      {
        page: number;
        pageSize: number;
        status: string | number;
        search: string;
      }
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
      { hasMore: boolean; items: any[] },
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

    getMyPropertyDetails: builder.query<MyPropertyDetailsType, string>({
      query: id => ({ url: `/properties/me/${id}`, method: 'GET' }),
    }),

    getRelatedProperties: builder.query({
      query: propertyId => ({
        url: `/properties/${propertyId}/related`,
        method: 'GET',
      }),
    }),

    editProperty: builder.mutation<any, any>({
      query: ({ body, propertyId }) => ({
        url: `/properties/${propertyId}/update-request`,
        method: 'POST',
        body,
      }),

      invalidatesTags: ['MyProperties'],
    }),

    resubmitProperty: builder.mutation<
      PropertyDetailsType,
      { propertyId: string; data: NFTFormData }
    >({
      query: ({ propertyId, data }) => {
        const formData = new FormData();

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

        if (data.propertyImage?.uri) {
          formData.append('Image', {
            uri: data.propertyImage.uri,
            name: data.propertyImage.name ?? 'image.jpg',
            type: data.propertyImage.type ?? 'image/jpeg',
          } as any);
        }

        data.documents?.forEach((doc, idx) => {
          if (doc.file?.uri) {
            formData.append(`Documents[${idx}].File`, {
              uri: doc.file.uri,
              name: doc.file.name ?? `doc_${idx}.pdf`,
              type: doc.file.type ?? 'application/pdf',
            } as any);
          }

          formData.append(`Documents[${idx}].Title`, doc.documentName ?? '');
        });

        return {
          url: `/properties/${propertyId}/resubmit`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['MyProperties'],
    }),

    investInProperty: builder.mutation<
      void,
      { propertyId: string; shares: number }
    >({
      query: body => ({ url: '/investments', method: 'POST', body }),
      invalidatesTags: ['MyInvestedProperties'],
    }),

    deleteProperty: builder.mutation<void, string>({
      query: propertyId => ({
        url: `/properties/${propertyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyProperties'],
    }),

    investmentInfo: builder.query<any, string>({
      query: propertyId => ({
        url: `/properties/${propertyId}/investInfo`,
        method: 'GET',
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
  useGetMyPropertiesQuery,
  useGetMyInvestedPropertiesQuery,
  useEditPropertyMutation,
  useGetMyPropertyDetailsQuery,
  useDeletePropertyMutation,
  useInvestmentInfoQuery,
  useResubmitPropertyMutation,
} = propertyApi;

export { propertyApi };
