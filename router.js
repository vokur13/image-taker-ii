import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// icons
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Register from './screens/auth/Register';
import Login from './screens/auth/Login';
import Posts from './screens/tab/Posts';
import Create from './screens/tab/Create';
import Profile from './screens/tab/Profile';

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

export const useRoutes = (isAuth) => {
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
  } else {
    return (
      <Tab.Navigator tabBarOptions={{ showLabel: false }}>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <FontAwesome name="list" size={size} color={color} />
            ),
          }}
          name="Posts"
          component={PostsScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons name="create" size={size} color={color} />
            ),
          }}
          name="Create"
          component={CreateScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size, color }) => (
              <MaterialCommunityIcons
                name="face-man-profile"
                size={size}
                color={color}
              />
            ),
          }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
