import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { app } from '../../firebase/config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

import { db } from '../../firebase/config';

const storage = getStorage();

// // Points to the root reference
const storageRef = ref(storage);

// // Points to 'comments'
const commentsRef = ref(storageRef, 'comments');

const CommentsScreen = ({ route }) => {
  const [comments, setComments] = useState('');
  const { nickname } = useSelector((state) => state.auth);

  const { postId } = route.params;

  const query = collection(db, 'posts', postId, 'comments');
  const [docs, loading, error] = useCollectionData(query);

  const createPost = async () => {
    console.log(docs);
    try {
      const docRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(docRef);
      await addDoc(docRef, collection(db, 'comments'), {
        comments,
        nickname,
      });

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);
    }
    // const docRef = await addDoc(
    //   collection(
    //     db,
    //     'posts',
    //     postId,
    //     collection(db, 'comments', { comments, nickname })
    //   )
    // );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} onChangeText={setComments} />
      </View>
      <View>
        <TouchableOpacity style={styles.sendButton} onPress={createPost}>
          <Text style={styles.sendText}>Add Post</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});

export default CommentsScreen;
