import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const image = require('../../assets/images/IMG_3764.jpeg');
const windowDimensions = Dimensions.get('window');
const initialState = {
  email: '',
  password: '',
};

export default function Login({ navigation }) {
  const [onKeyboardShown, setOnKeyboardShown] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
  });

  const [fontsLoaded] = useFonts({
    'DMMono-Regular': require('../../assets/fonts/DMMono-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  //   useEffect(() => {
  //     const subscription = Dimensions.addEventListener('change', ({ window }) => {
  //       setDimensions({ window });
  //       const { width } = dimensions.window;
  //       console.log('width', width);
  //     });
  //     return () => subscription?.remove();
  //   });

  const keyboardHide = () => {
    setOnKeyboardShown(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <SafeAreaView style={styles.safeView}>
              <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>ImageTaker II</Text>
              </View>
              {/* <View style={styles.bodyTextContainer}>
                <Text style={styles.bodyText}>
                  At social we believe in a new type of interaction.
                  {'\n'}
                  {'\n'}
                  One that crosses the boundaries of what was possible before.
                  {'\n'}
                  {'\n'}
                  Sign up today and check out the future of social networking.
                </Text>
              </View> */}
              <View
                style={[
                  styles.signUpContainer,
                  {
                    marginBottom: onKeyboardShown ? '5%' : '12%',
                  },
                ]}
              >
                <View style={[styles.inputContainer, { marginBottom: 20 }]}>
                  <Text style={styles.inputTitle}>E-mail</Text>
                  <TextInput
                    style={styles.inputText}
                    textAlign={'center'}
                    placeholder={'E-mail'}
                    inputMode={'email'}
                    keyboardType={'email-address'}
                    onFocus={() => {
                      setOnKeyboardShown(true);
                    }}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Password</Text>
                  <TextInput
                    style={styles.inputText}
                    textAlign={'center'}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    onFocus={() => {
                      setOnKeyboardShown(true);
                    }}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                </View>
                <TouchableOpacity style={styles.signUp} onPress={keyboardHide}>
                  <Text style={styles.signUpText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingTop: '5%' }}
                  onPress={() => navigation.navigate('Register')}
                >
                  <Text style={{ color: 'white' }}>
                    If new to app&nbsp;&nbsp;
                    <Text
                      style={{
                        fontFamily: 'DMMono-Regular',
                        fontSize: '20%',
                        color: '#ff1493',
                      }}
                    >
                      SignUp
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  safeView: {
    flex: 1,
  },
  welcomeTextContainer: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  welcomeText: {
    fontSize: '40%',
    // fontWeight: 'bold',
    fontFamily: 'DMMono-Regular',
  },
  bodyTextContainer: {
    // backgroundColor: 'yellow',
    paddingTop: '5%',
    paddingBottom: '20%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  bodyText: {
    fontSize: '15%',
    fontFamily: 'DMMono-Regular',
  },
  signUpContainer: {
    paddingTop: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  inputContainer: {
    width: '100%',
  },
  inputTitle: {
    width: '100%',
    color: '#f0f8ff',
    marginBottom: 5,
    fontSize: 18,
    fontFamily: 'DMMono-Regular',
  },
  inputText: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#f0f8ff',
    height: 40,
    borderRadius: 6,
    color: '#8b0000',
    backgroundColor: '#fff',
    fontFamily: 'DMMono-Regular',
  },
  signUp: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: '10%',
    marginBottom: 10,
    backgroundColor: '#8b0000',
    borderColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 18,
    color: '#f0f8ff',
    fontSize: 28,
    fontFamily: 'DMMono-Regular',
  },
});
