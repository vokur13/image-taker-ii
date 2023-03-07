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
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
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
              <Text style={styles.title}>
                {item.title ? item.title : 'No title'}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button]}
                // title="go to Map"
                onPress={() =>
                  navigation.navigate('Map', { location: item.location })
                }
              >
                {/* <Text style={[styles.buttonText]}>Map</Text> */}
                <FontAwesome5 name="map-marked-alt" size={24} color="#a9a9a9" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button]}
                // title="go to Comments"
                onPress={() =>
                  navigation.navigate('Comments', { postId: item.id })
                }
              >
                {/* <Text style={[styles.buttonText]}>Comments</Text> */}
                <FontAwesome name="comments-o" size={24} color="#a9a9a9" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: '#808080',
  },
  postsImageContainer: {
    padding: '1%',
    backgroundColor: 'white',
    marginBottom: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    paddingBottom: '1.5%',
  },
  postsImage: {
    // height: 150,
    height: 250,
    width: '100%',
    borderRadius: 8,
  },
  title: {
    fontSize: '18%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: '1%',
    // borderColor: 'red',
    // borderWidth: 1,
    marginHorizontal: 1,
    borderRadius: 8,
  },

  buttonText: {
    color: 'red',
  },
});
