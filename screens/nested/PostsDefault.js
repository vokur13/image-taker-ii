import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

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
    <FlatList
      style={styles.flatList}
      data={posts}
      renderItem={({ item }) => (
        <View style={styles.postsImageContainer}>
          <Image source={{ uri: item.downloadURL }} style={styles.postsImage} />
          <View>
            <Text style={styles.title}>
              {item.title ? item.title : 'No title'}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>
                navigation.navigate('Map', { location: item.location })
              }
            >
              <FontAwesome5
                name="map-marked-alt"
                size={'27%'}
                color="#a9a9a9"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>
                navigation.navigate('Comments', { postId: item.id })
              }
            >
              <FontAwesome name="comments-o" size={'32%'} color="#a9a9a9" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    backgroundColor: '#d3d3d3',
  },
  postsImageContainer: {
    padding: '1%',
    backgroundColor: 'white',
    marginBottom: '1%',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    paddingBottom: '1.5%',
  },
  postsImage: {
    height: 250,
    width: '100%',
    borderRadius: 8,
    marginBottom: '1%',
  },
  title: {
    fontSize: '18%',
    fontFamily: 'DMMono-Regular',
    marginTop: '2%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: '1%',
    marginHorizontal: 1,
    borderRadius: 8,
  },

  buttonText: {
    color: 'red',
  },
});
