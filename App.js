import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Login from './screens/auth/Login';
import Register from './screens/auth/Register';

SplashScreen.preventAutoHideAsync();

// const image = require('./assets/images/IMG_3764.jpeg');
// const windowDimensions = Dimensions.get('window');

export default function App() {
  // const [dimensions, setDimensions] = useState({
  //   window: windowDimensions,
  // });

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener('change', ({ window }) => {
  //     setDimensions({ window });
  //     const { width } = dimensions.window;
  //     console.log('width', width);
  //   });
  //   return () => subscription?.remove();
  // });

  const [fontsLoaded] = useFonts({
    'DMMono-Regular': require('./assets/fonts/DMMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <Register /> */}
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
