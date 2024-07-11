import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchArgs,
} from '@reduxjs/toolkit/dist/query';
import { APIDefaultErrorDetail, APIErrorResponse } from 'types';

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const PUSHER_KEY = process.env.REACT_APP_PUSHER_APP_KEY || '';
export const PUSHER_CLUSTER = process.env.REACT_APP_PUSHER_APP_CLUSTER || '';

export const getBaseQuery = (
  pathname?: string,
): BaseQueryFn<string | FetchArgs> => {
  return fetchBaseQuery({
    baseUrl: `${API_BASE_URL}${pathname ? `/${pathname}` : ''}`,
  });
};

export const getAPIErrorMessage = (
  error: APIErrorResponse,
  defaultMessage = 'Something went wrong',
) => {
  return (
    (error?.data?.detail as APIDefaultErrorDetail[])?.[0]?.msg ||
    error?.data?.detail ||
    defaultMessage
  );
};

export const getAPIErrorType = (error: APIErrorResponse) => {
  return (error?.data?.detail as APIDefaultErrorDetail[])?.[0]?.type || '';
};
