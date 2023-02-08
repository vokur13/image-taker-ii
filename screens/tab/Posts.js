import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Posts({ route }) {
  console.log('route.params', route);

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
