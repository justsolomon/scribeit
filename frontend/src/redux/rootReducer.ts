import { sampleApi, videoApi } from './services';
import { sample } from './slices';

const rootReducer = {
  sample,
  [sampleApi.reducerPath]: sampleApi.reducer,
  [videoApi.reducerPath]: videoApi.reducer,
};

export default rootReducer;
