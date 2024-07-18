import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoState } from 'types';

const initialState: VideoState = {
  video: null,
  isVideoUploadStarted: false,
  videoPlayerSettings: {
    enableDefaultLayout: true,
  },
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoInfo: (
      state,
      action: PayloadAction<VideoState['video'] | null>,
    ) => {
      state.video = action.payload;
    },
    updateVideoPlayerSettings: (
      state,
      action: PayloadAction<Partial<VideoState['videoPlayerSettings']>>,
    ) => {
      state.videoPlayerSettings = {
        ...state.videoPlayerSettings,
        ...action.payload,
      };
    },
    setIsVideoUploadStarted: (state, action: PayloadAction<boolean>) => {
      state.isVideoUploadStarted = action.payload;
    },
  },
});

export const {
  setVideoInfo,
  updateVideoPlayerSettings,
  setIsVideoUploadStarted,
} = videoSlice.actions;

export default videoSlice.reducer;
