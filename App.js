import NetInfo from '@react-native-community/netinfo';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import AppHub from './components/AppHub';

// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { app } from './firebase/config';
// import { useState, useEffect } from 'react';

// const auth = getAuth(app);

export default function App() {
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // To unsubscribe to these update, just use:
  unsubscribe();

  return (
    <Provider store={store}>
      <AppHub />
    </Provider>
  );
}
