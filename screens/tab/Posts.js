import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log('posts', posts);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postsImageContainer}>
            <Image source={{ uri: item.photo }} style={styles.postsImage} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  flatList: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  postsImageContainer: {
    padding: '1%',
    backgroundColor: 'green',
    marginBottom: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postsImage: {
    height: '100%',
    width: '100%',
  },
});
