import api from '@redux/store/api';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import { NFTFormData } from '@screens/CreateNFT/types';
import { PropertyDetailsType } from '@utils/types';
import { RootState, useAppSelector } from '@redux/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

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
        formData.append(
          'TotalUnits',
          (data.numberOfShares ?? 0).toString(),
        );
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
          Headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getMyProperties: builder.query<PropertyCardProps[], void>({
      query: () => ({
        url: '/properties/me', 
        method: 'GET'
      })
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

    searchProperties: builder.query<
      { hasMore: boolean; items: PropertyCardProps[] },
      { search: string; propertyType: string; page: number; pageSize: number }
    >({
      query: ({ search, propertyType, page, pageSize }) => ({
        url: `/properties/marketplace?page=${page}&pageSize=${pageSize}&search=${search}&propertyType=${propertyType}`,
        method: 'GET',
      }),
    }),

    getRelatedProperties: builder.query({
      query: propertyId => ({
        url: `/properties/${propertyId}/related`,
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
  useLazySearchPropertiesQuery,
  useGetRelatedPropertiesQuery,
  useGetMyPropertiesQuery
} = propertyApi;

export { propertyApi };
