import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sampleSlice = createSlice({
  name: 'sample',
  initialState: {},
  reducers: {
    setKey: (state, action: PayloadAction<void>) => {
      //   state[key] = action.payload;
    },
  },
});

export const { setKey } = sampleSlice.actions;

export default sampleSlice.reducer;
