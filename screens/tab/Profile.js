import { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOut } from '../../redux/auth/authOperations';

import {
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    // const docRef = doc(db, 'posts', postId);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   const commentsRef = collection(docRef, 'comments');
    //   onSnapshot(commentsRef, (querySnapshot) => {
    //     setAllComments(
    //       querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     );
    //   });
    // }

    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
    // const docSnap = await getDoc(q);

    // if (docSnap.exists()) {
    //   const commentsRef = collection(q, 'comments');
    //   onSnapshot(commentsRef, (querySnapshot) => {
    //     concole.log(
    //       querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     );
    //   });
    // }

    // onSnapshot(postsRef, (querySnapshot) => {
    //   console.log(
    //     querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //   );
    // });
  };

  const logOut = () => {
    dispatch(authSignOut());
  };

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title="SignOut" onPress={logOut} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
