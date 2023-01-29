import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import Posts from './screens/tab/Posts';
import Create from './screens/tab/Create';
import Profile from './screens/tab/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Create"
        component={CreateScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Login navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Register navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}

function PostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Posts navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}

function CreateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Create navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Profile navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const router = useRoutes(true);
  return <NavigationContainer>{router}</NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
