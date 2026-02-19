import api from '@redux/store/api';
import PropertyCardProps from '@components/molecules/CardContainer2/PropertyCardProps.type';
import { NFTFormData } from '@screens/CreateNFT/types';
import { PropertyDetailsType } from '@utils/types';
import { RootState, useAppSelector } from '@redux/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';


const MOCK_INVESTED = Array.from({ length: 42 }).map((_, i) => ({
  investmentId: i + 1,
  propertyName: `Property ${i + 1}`,
  location: `City ${i % 5}`,
  imageUrl: 'https://picsum.photos/200',
  tokensOwned: Math.floor(Math.random() * 1000),
  investedEth: Math.random() * 5,
  currentValueEth: Math.random() * 6,
  unrealizedPnLEth: Math.random(),
  unrealizedPnLPercent: Math.random() * 10,
  monthlyIncomeEth: Math.random() * 0.1,
  riskScore: Math.random() * 10,
}));


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
          Headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getMyProperties: builder.query<PropertyCardProps[], void>({
      query: () => ({
        url: '/properties/me',
        method: 'GET',
      }),
    }),

    // getMyInvestedProperties: builder.query<PropertyCardProps[], void>({
    //   query: () => ({
    //     url: '/investments/me',
    //     method: 'GET',
    //   }),
    // }),

    getMyInvestedProperties: builder.query({
      async queryFn({ page, pageSize, search }) {
        const filtered = MOCK_INVESTED.filter(p =>
          p.propertyName.toLowerCase().includes(search?.toLowerCase() ?? ''),
        );

        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        await new Promise(r => setTimeout(r, 500));

        return {
          data: {
            items: filtered.slice(start, end),
            hasMore: end < filtered.length,
          },
        };
      },
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
  useLazySearchPropertiesQuery,
  useGetRelatedPropertiesQuery,
  useInvestInPropertyMutation,
  useGetMyPropertiesQuery,
  useLazyGetMyInvestedPropertiesQuery,
  useEditPropertyMutation,
  useGetMyPropertyDetailsQuery,
} = propertyApi;

export { propertyApi };
