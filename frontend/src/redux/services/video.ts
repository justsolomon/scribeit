import { createApi } from '@reduxjs/toolkit/query/react';
import {
  APIDefaultResponse,
  TranscriptionData,
  UploadVideoResponse,
} from 'types';
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
    getTranscription: builder.query<TranscriptionData, string>({
      query: (userId) => ({
        url: '/transcription',
        params: {
          userId,
        },
      }),
    }),
  }),
});

export const {
  useLazyVideoUploadAllowedQuery,
  useUploadVideoMutation,
  useLazyGetTranscriptionQuery,
} = videoApi;

export default videoApi;
