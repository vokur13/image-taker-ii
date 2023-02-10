import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { authSignOut } from '../../redux/auth/authOperations';

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(authSignOut());
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="SignOut" onPress={logOut} />
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
