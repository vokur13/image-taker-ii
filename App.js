// import { useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import AppHub from './components/AppHub';
import { SafeAreaView, StyleSheet } from 'react-native';

// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  // To unsubscribe to these update, just use:
  unsubscribe();

  // const [fontsLoaded] = useFonts({
  //   'DMMono-Regular': require('./assets//fonts/DMMono-Regular.ttf'),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <Provider
      store={store}
      // onLayout={onLayoutRootView}
    >
      <AppHub />
    </Provider>
  );
}
