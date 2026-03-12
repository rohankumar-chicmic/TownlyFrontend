import { API_BASE_URL } from '@utils/constants';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { logoutAndDisconnect } from './logoutAndDisconnect';

interface LocalRootState {
  auth: {
    userToken: string | null;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Cast to LocalRootState to avoid importing store.ts
    const token = (getState() as LocalRootState).auth.userToken;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if ('error' in result) {
    const status = result?.error?.status;
    const errorData = result?.error?.data as
      | { message?: string; error?: string }
      | undefined;

    if (status === 401) {
      console.error('Unauthorized access');
      // 2. Use api.dispatch (local) instead of store.dispatch (global)
      api.dispatch(logoutAndDisconnect());
    } else {
      console.error(
        `API Error: ${status} - ${errorData?.message || errorData?.error}`,
      );
    }
  }

  return result;
};

const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: [
    'MyInvestedProperties',
    'MyProperties',
    'MyPropertyDetail',
    'Properties',
    'FeaturedProperties',
    'Notifications',
    'Transactions',
    'InvestmentDetails',
  ],
});

export default api;
