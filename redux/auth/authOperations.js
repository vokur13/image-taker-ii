import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebase/config';

const auth = getAuth(app);

export const authSignUp =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
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

export const authLogin = () => async (dispatch, getState) => {};
export const authLogout = () => async (dispatch, getState) => {};
