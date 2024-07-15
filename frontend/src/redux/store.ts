import { Middleware } from 'redux';
import { videoApi } from './services';
import { configureStore } from '@reduxjs/toolkit';
import { errorHandlerMiddleware } from './middleware';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

let middleware: Middleware[] = [videoApi.middleware, errorHandlerMiddleware];

// remove logger in production mode
if (process.env.NODE_ENV !== 'production') {
  //@ts-ignore
  middleware = [...middleware, logger];
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
