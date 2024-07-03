import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

const sampleApi = createApi({
  reducerPath: 'sampleApi',
  baseQuery: getBaseQuery(''),
  endpoints: (builder) => ({
    home: builder.query<any, void>({
      query: () => ({
        url: `/`,
      }),
    }),
    // createItem: builder.mutation<ResponseType, RequestType>({
    //   query: (body) => ({
    //     url: '/',
    //     body,
    //     method: 'POST',
    //   }),
    // }),
  }),
});

export const { useHomeQuery } = sampleApi;

export default sampleApi;
