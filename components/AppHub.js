import React, { useEffect, useState } from 'react';
import { useRoutes } from '../router';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/config';
import { authStateChanged } from '../redux/auth/authOperations';

const auth = getAuth(app);

const AppHub = () => {
  // const [user, setUser] = useState(null);
  const { authStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     setUser(uid);
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  const router = useRoutes(authStatus);

  return <NavigationContainer>{router}</NavigationContainer>;
};

export default AppHub;
