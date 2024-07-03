import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

const errorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // let errorMessage = action.error.message;
    // if (action.payload) {
    //   errorMessage = action.payload?.data?.message as string;
    // }
  }

  return next(action);
};

export default errorHandler;
