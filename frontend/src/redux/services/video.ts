import { createApi } from '@reduxjs/toolkit/query/react';
import { APIDefaultResponse, UploadVideoResponse } from 'types';
import { getBaseQuery } from 'utils';

const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: getBaseQuery('video'),
  endpoints: (builder) => ({
    videoUploadAllowed: builder.query<APIDefaultResponse, void>({
      query: () => '/upload-allowed',
    }),
    uploadVideo: builder.mutation<UploadVideoResponse, FormData>({
      query: (body) => ({
        url: '/upload',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLazyVideoUploadAllowedQuery, useUploadVideoMutation } =
  videoApi;

export default videoApi;
