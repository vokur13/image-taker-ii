import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { app } from '../../firebase/config';

import { authSlice } from './authReducer';

const auth = getAuth(app);

export const authSignUp =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      // const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);
      //   const user = userCredential.user;

      // const user = auth.currentUser;

      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });

      //   const user = auth.currentUser;
      //   console.log('user.uid', user.uid);

      //   await user.updateProfile({
      //     displayName: nickname,
      //   });

      const { uid, displayName } = auth.currentUser;
      //   console.log(uid, displayName);

      await dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );

      //   const user = auth.currentUser;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  };

export const authLogin =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  };

export const authLogout = () => async (dispatch, getState) => {};

export const authStateChanged = () => async (dispatch, getState) => {};
