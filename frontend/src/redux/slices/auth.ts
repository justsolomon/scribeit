import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: {} as User },
  reducers: {
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setActiveUser } = authSlice.actions;

export default authSlice.reducer;
