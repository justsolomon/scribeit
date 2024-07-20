import { videoApi } from './services';
import { auth, transcription, video } from './slices';

const rootReducer = {
  auth,
  video,
  transcription,
  [videoApi.reducerPath]: videoApi.reducer,
};

export default rootReducer;
