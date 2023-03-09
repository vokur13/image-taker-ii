import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  nickname: null,
  authStatus: false,
};

const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    nickname: payload.nickname,
  }),
  authStateChange: (state, { payload }) => ({
    ...state,
    authStatus: payload.authStatus,
  }),
  authLogout: () => state,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: actions,
});

export const { updateUserProfile, authStateChange, authLogout } =
  authSlice.actions;
