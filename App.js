import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useRoutes } from './router';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase/config';
import { useState } from 'react';

const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);

  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // To unsubscribe to these update, just use:
  unsubscribe();

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

  const router = useRoutes(user);

  return (
    <Provider store={store}>
      <NavigationContainer>{router}</NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
