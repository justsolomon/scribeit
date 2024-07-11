import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery } from 'utils';

const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: getBaseQuery('video'),
  endpoints: (builder) => ({
    uploadVideo: builder.mutation<any, FormData>({
      query: (body) => ({
        url: '/upload',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const { useUploadVideoMutation } = videoApi;

export default videoApi;
