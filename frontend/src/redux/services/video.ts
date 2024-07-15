import { createApi } from '@reduxjs/toolkit/query/react';
import { UploadVideoResponse } from 'types';
import { getBaseQuery } from 'utils';

const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: getBaseQuery('video'),
  endpoints: (builder) => ({
    uploadVideo: builder.mutation<UploadVideoResponse, FormData>({
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
