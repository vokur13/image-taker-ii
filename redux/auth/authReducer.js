import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    nickname: null,
    authStatus: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      authStatus: payload.authStatus,
    }),
  },
});

export const { updateUserProfile, authStateChange } = authSlice.actions;
export default authSlice.reducer;
