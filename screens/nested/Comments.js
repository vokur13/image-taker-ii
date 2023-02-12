import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  collection,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';

import { db } from '../../firebase/config';

const CommentsScreen = ({ route }) => {
  const [comments, setComments] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const { postId } = route.params;

  const query = collection(db, 'posts');
  const [docs, loading, error] = useCollectionData(query);

  const getAllPosts = async () => {
    try {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const commentsRef = collection(docRef, 'comments');
        onSnapshot(commentsRef, (querySnapshot) => {
          setAllComments(
            querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    try {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const commentsRef = collection(docRef, 'comments');
        await addDoc(commentsRef, {
          comments,
          nickname,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allComments}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>{item.nickname}</Text>
            <Text>{item.comments}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} onChangeText={setComments} />
      </View>
      <View>
        <TouchableOpacity style={styles.sendButton} onPress={createPost}>
          <Text style={styles.sendText}>Add Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 4,
  },
  inputText: {
    height: 50,
    fontSize: '20%',
    color: 'black',
  },
  sendButton: {
    // marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: '#dc143c',
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '98%',
    marginBottom: 30,
  },
  sendText: {
    color: '#dc143c',
    fontSize: '20',
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#dc143c',
    marginBottom: '1%',
    paddingHorizontal: 2,
  },
});

export default CommentsScreen;
