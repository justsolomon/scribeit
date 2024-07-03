import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchArgs,
} from '@reduxjs/toolkit/dist/query';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getBaseQuery = (
  pathname?: string,
): BaseQueryFn<string | FetchArgs> => {
  return fetchBaseQuery({
    baseUrl: `${API_BASE_URL}${pathname ? `/${pathname}` : ''}`,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;

      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }

      return headers;
    },
  });
};
