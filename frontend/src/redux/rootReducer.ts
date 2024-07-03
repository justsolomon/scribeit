import { sampleApi } from './services';
import { sample } from './slices';

const rootReducer = {
  sample,
  [sampleApi.reducerPath]: sampleApi.reducer,
};

export default rootReducer;
