import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TranscriptionAction, TranscriptionState } from 'types';
import { compileSegments } from 'utils';

const initialState: TranscriptionState = {
  status: null,
  result: null,
  serverResult: null,
  srtFilePath: null,
  actionHistory: { stack: [], checkpointIndex: 0 },
};

export const transcriptionSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setTranscriptionStatus: (
      state,
      action: PayloadAction<TranscriptionState['status']>,
    ) => {
      state.status = action.payload;
    },
    setTranscriptionServerResult: (
      state,
      action: PayloadAction<TranscriptionState['serverResult']>,
    ) => {
      state.serverResult = action.payload;
      state.result = {
        text:
          action.payload?.reduce((prev, curr) => prev + ' ' + curr, '') || '',
        segments: compileSegments(action.payload || []),
        language: 'en',
      };
    },
    setTranscriptionResult: (
      state,
      action: PayloadAction<TranscriptionState['result']>,
    ) => {
      state.result = action.payload;
    },
    setSRTFilePath: (
      state,
      action: PayloadAction<TranscriptionState['srtFilePath']>,
    ) => {
      state.srtFilePath = action.payload;
    },
    setActionHistoryData: (
      state,
      action: PayloadAction<TranscriptionAction[]>,
    ) => {
      state.actionHistory.stack = action.payload;
      state.actionHistory.checkpointIndex = action.payload.length - 1;
    },
    setActionHistoryCheckpoint: (state, action: PayloadAction<number>) => {
      state.actionHistory.checkpointIndex = action.payload;
    },
    resetTranscriptionState: (state) => {
      state.status = null;
      state.result = null;
      state.srtFilePath = null;
      state.serverResult = null;
      state.actionHistory = { stack: [], checkpointIndex: 0 };
    },
  },
});

export const {
  setTranscriptionStatus,
  setTranscriptionServerResult,
  setTranscriptionResult,
  setSRTFilePath,
  setActionHistoryData,
  setActionHistoryCheckpoint,
  resetTranscriptionState,
} = transcriptionSlice.actions;

export default transcriptionSlice.reducer;
