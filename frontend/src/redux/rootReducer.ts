import { videoApi } from './services';
import { auth } from './slices';

const rootReducer = {
  auth,
  [videoApi.reducerPath]: videoApi.reducer,
};

export default rootReducer;
