import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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
    <View style={styles.container}>
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
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.button} onPress={logOut}>
        {/* <AntDesign name="logout" size={'42%'} color="#808080" /> */}
        <AntDesign name="logout" size={'36%'} color="white" />
      </TouchableOpacity>
      {/* <Button title="SignOut" onPress={logOut} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // marginHorizontal: '0.5%',
    backgroundColor: '#d3d3d3',
  },
  flatList: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  postsImageContainer: {
    padding: '1%',
    backgroundColor: 'white',
    marginBottom: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: '1%',
    // height: '35%',
  },
  postsImage: {
    height: 250,
    width: '100%',
    borderRadius: 6,
  },
  title: {
    fontFamily: 'DMMono-Regular',
    fontSize: '18%',
    marginVertical: '1%',
  },
  button: {
    borderColor: 'red',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '1%',
    backgroundColor: 'white',
    borderRadius: 70,
    borderColor: 'white',
    paddingVertical: '3%',
    marginHorizontal: '1%',
    backgroundColor: 'red',
  },
});
