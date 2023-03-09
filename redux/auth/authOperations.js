import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';

import { updateUserProfile, authStateChange, authLogout } from './authReducer';

export const authSignUp =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });

      const { uid, displayName } = auth.currentUser;

      await dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
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
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  await signOut(auth);
  await dispatch(authLogout());
};

export const authStateChanged = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const displayName = user.displayName;
      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
      dispatch(authStateChange({ authStatus: true }));
    } else {
      // User is signed out
    }
  });
};
