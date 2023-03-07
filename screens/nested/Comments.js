import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { MaterialIcons } from '@expo/vector-icons';

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
  const [onKeyboardShown, setOnKeyboardShown] = useState(false);

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
    } finally {
      Keyboard.dismiss();
      setOnKeyboardShown(false);
    }
  };

  const handleKeyboard = () => {
    Keyboard.dismiss();
    setOnKeyboardShown(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={handleKeyboard}>
        <SafeAreaView style={styles.safeView}>
          <View style={styles.commentListContainer}>
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                // <Shadow style={styles.commentShadow} offset={[3, 4]}>
                <View style={styles.commentContainer}>
                  <Text style={styles.postNickname}>{item.nickname}</Text>
                  <Text style={styles.postText}>{item.comments}</Text>
                </View>
                // </Shadow>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              onChangeText={setComments}
              placeholder="Type comment here"
              onFocus={() => {
                setOnKeyboardShown(true);
              }}
            />
          </View>
          <View
            style={[
              styles.buttonContainer,
              {
                backgroundColor: '#e0e0e0',
                marginBottom: onKeyboardShown ? '15%' : null,
              },
            ]}
          >
            <View style={[styles.sendButton, styles.neuButtonSecondShadow]}>
              <TouchableOpacity
                style={[styles.sendButton, styles.neuButton]}
                onPress={createPost}
              >
                <MaterialIcons
                  name="add-comment"
                  size={'36%'}
                  color="#808080"
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  safeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  commentListContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '1%',
  },
  commentShadow: {
    width: '100%',
    marginBottom: '2%',
  },
  commentContainer: {
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 1,
    width: '100%',
  },
  inputContainer: {
    width: '100%',

    borderRadius: 6,
    backgroundColor: 'white',
    paddingHorizontal: '1%',
    paddingVertical: '3%',
    marginHorizontal: '1%',
  },
  inputText: {
    fontSize: '20%',

    fontFamily: 'DMMono-Regular',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
    // marginBottom: 30,
  },
  sendButton: {
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
