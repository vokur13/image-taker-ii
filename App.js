import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useRoutes } from './router';

import { store } from './redux/store';
import { Provider } from 'react-redux';

export default function App() {
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // To unsubscribe to these update, just use:
  unsubscribe();

  const router = useRoutes(false);

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
