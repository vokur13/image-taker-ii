import React, { useEffect, useState } from 'react';
import { useRoutes } from '../router';
import {} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/config';

const auth = getAuth(app);

const AppHub = () => {
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state);
  console.log('state', state);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setUser(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  useEffect(() => {}, []);

  const router = useRoutes(user);

  return <NavigationContainer>{router}</NavigationContainer>;
};

export default AppHub;
