import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Posts</Text>
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
