import { videoApi } from './services';
import { auth, video } from './slices';

const rootReducer = {
  auth,
  video,
  [videoApi.reducerPath]: videoApi.reducer,
};

export default rootReducer;
