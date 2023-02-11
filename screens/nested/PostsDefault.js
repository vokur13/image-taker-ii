import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Button,
  Text,
} from 'react-native';

import { app } from '../../firebase/config';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
const db = getFirestore(app);

export default function PostsDefaultScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const postsRef = collection(db, 'posts');
    onSnapshot(postsRef, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.postsImageContainer}>
            <Image
              source={{ uri: item.downloadURL }}
              style={styles.postsImage}
            />
            <View>
              <Text>{item.comments}</Text>
            </View>
            <View>
              <Button
                title="go to Map"
                onPress={() =>
                  navigation.navigate('Map', { location: item.location })
                }
              />
              <Button
                title="go to Comments"
                onPress={() =>
                  navigation.navigate('Comments', { postId: item.id })
                }
              />
            </View>
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
    height: 150,
    width: '100%',
    borderRadius: 8,
  },
});
