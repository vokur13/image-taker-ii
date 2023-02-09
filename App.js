import NetInfo from '@react-native-community/netinfo';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import AppHub from './components/AppHub';

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
