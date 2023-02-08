import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const authSignUp =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('user', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
export const authLogin = () => async (dispatch, getState) => {};
export const authLogout = () => async (dispatch, getState) => {};
