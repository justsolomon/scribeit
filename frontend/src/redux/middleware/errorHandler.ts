import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { APIErrorResponse } from 'types';
import { getAPIErrorMessage, getAPIErrorType } from 'utils';
import { toastErrorMessage } from 'utils/toast';

const errorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    let errorMessage = action.error.message;
    let errorType = '';

    if (action.payload) {
      console.log(action.payload);
      errorMessage = getAPIErrorMessage(
        action.payload as APIErrorResponse,
        errorMessage,
      );
      errorType = getAPIErrorType(action.payload as APIErrorResponse);
    }

    if (!errorType && errorMessage) {
      toastErrorMessage(errorMessage);
    }
  }

  return next(action);
};

export default errorHandler;
