import React, { useEffect } from 'react';
import { useRoutes } from '../router';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { authStateChanged } from '../redux/auth/authOperations';

const AppHub = () => {
  const { authStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  const router = useRoutes(authStatus);

  return <NavigationContainer>{router}</NavigationContainer>;
};

export default AppHub;
