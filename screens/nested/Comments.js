import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

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
    <>
      <View style={styles.commentListContainer}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <Shadow style={styles.commentShadow} offset={[3, 4]}>
              <View style={styles.commentContainer}>
                <Text style={styles.postNickname}>{item.nickname}</Text>
                <Text style={styles.postText}>{item.comments}</Text>
              </View>
            </Shadow>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          onChangeText={setComments}
          placeholder="Type here"
        />
      </View>
      <View style={[styles.buttonContainer, { backgroundColor: '#e0e0e0' }]}>
        <View style={[styles.sendButton, styles.neuButtonSecondShadow]}>
          <TouchableOpacity
            style={[styles.sendButton, styles.neuButton]}
            onPress={createPost}
          >
            <Text style={styles.sendText}>Add Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  commentListContainer: {
    flex: 1,
    marginHorizontal: '2%',
  },
  commentShadow: {
    width: '100%',
    marginBottom: '2%',
  },
  commentContainer: {
    // borderWidth: 1,
    // borderColor: '#dc143c',
    // marginBottom: '2%',
    paddingHorizontal: '0.5%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  inputContainer: {
    // flex: 1,
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderRadius: 4,
    backgroundColor: 'white',
    paddingHorizontal: '1%',
    paddingVertical: '2%',
  },
  inputText: {
    // height: 50,
    fontSize: '20%',
    // color: 'black',
    // backgroundColor: 'pink',
    fontFamily: 'DMMono-Regular',
  },
  // segment: {
  //   flex: 1,
  //   width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  buttonContainer: {
    // backgroundColor: 'yellow',
    // justifyContent: 'center',
    // alignItems: 'center',

    // flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
  sendButton: {
    // marginHorizontal: 30,
    // height: 40,
    // borderWidth: 1,
    // borderColor: '#dc143c',
    // borderRadius: 8,
    // marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '98%',
    // marginBottom: 30,

    width: 200,
    height: 70,
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neuButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    shadowColor: '#bebebe',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 12,
  },
  neuButtonSecondShadow: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    width: 200,
    height: 70,
    borderRadius: 30,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: -20,
      height: -20,
    },
    shadowOpacity: 1.0,
    shadowRadius: 30,
    elevation: 12,
  },
  sendText: {
    // color: '#dc143c',
    fontSize: '21%',
    fontFamily: 'DMMono-Regular',
  },
  postNickname: {
    fontFamily: 'DMMono-Medium',
    fontSize: '18%',
    fontWeight: 'bold',
    color: 'red',
  },
  postText: {
    fontFamily: 'DMMono-Italic',
    fontSize: '18%',
  },
});

export default CommentsScreen;
