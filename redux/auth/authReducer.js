import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    nickname: null,
    authStatus: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
    }),
    authStateChange: (state, payload) => ({
      ...state,
      authStatus: payload.authStatus,
    }),
  },
});

console.log('authSlice', authSlice);