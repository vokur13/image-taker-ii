import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { authLogout } from '../../redux/auth/authOperations';

import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase/config';
const auth = getAuth(app);

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="SignOut" onPress={() => signOut(auth)} />
      {/* <Button title="SignOut" onPress={authLogout} /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
