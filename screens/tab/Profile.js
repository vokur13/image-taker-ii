import { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  FlatList,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOut } from '../../redux/auth/authOperations';

import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useState } from 'react';

export default function ProfileScreen() {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = query(
      collection(db, 'posts'),
      where('userId', '==', userId)
    );
    onSnapshot(postsRef, (querySnapshot) => {
      setUserPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  const logOut = () => {
    dispatch(authSignOut());
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={userPosts}
        renderItem={({ item }) => (
          <View style={styles.postsImageContainer}>
            <Image
              source={{ uri: item.downloadURL }}
              style={styles.postsImage}
            />
            <View>
              <Text>{item.title}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="SignOut" onPress={logOut} />
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
