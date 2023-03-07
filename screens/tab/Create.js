import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  TextInput,
} from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { app } from '../../firebase/config';
import { uploadData } from '../../firebase/uploadBytesResumable';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
const db = getFirestore(app);

const storage = getStorage();

// // Points to the root reference
const storageRef = ref(storage);

// // Points to 'images'
const imagesRef = ref(storageRef, 'images');

export default function CreateScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');

  const { userId, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    let location = await Location.getCurrentPositionAsync({});
    // console.log(
    //   'location',
    //   location.coords.latitude,
    //   location.coords.longitude
    // );
    setLocation(location);
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    await uploadPosts();
    await navigation.navigate('DefaultScreen', { photo });
    setTitle('');
  };

  const uploadPosts = async () => {
    try {
      const downloadURL = await uploadPhoto();
      const docRef = await addDoc(collection(db, 'posts'), {
        userId,
        nickname,
        downloadURL,
        title,
        location: location.coords,
      });
      // Update the timestamp field with the value from the server
      await updateDoc(docRef, {
        timestamp: serverTimestamp(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e.message);
    }
  };

  const uploadPhoto = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniqueId = Date.now().toString();

    // Points to 'images/`${uniqueId}`'
    // Note that you can use variables to create child values
    const fileName = `${uniqueId}`;
    const spaceRef = ref(imagesRef, fileName);

    // 'file' comes from the Blob or File API
    await uploadBytes(spaceRef, file);

    return await getDownloadURL(spaceRef);
  };

  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: photo }}
              style={{
                height: 200,
                width: 200,
                borderRadius: 10,
              }}
            />
          </View>
        )}
        <View style={[styles.segment]}>
          <TouchableOpacity
            style={[styles.button, styles.skeuomorphicButton]}
            onPress={takePhoto}
          >
            <LinearGradient
              // Background Linear Gradient
              colors={['#F93a3a', '#BA0E0E']}
              style={styles.skeuomorphicShift}
            />
            <LinearGradient
              // Background Linear Gradient
              colors={['#BA0E0E', '#F93a3a']}
              style={styles.skeumorphicGradientStyling}
            >
              {/* <Text style={styles.text}>Snap</Text> */}
              <MaterialIcons name="add-a-photo" size={'36%'} color="#d3d3d3" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          onChangeText={setTitle}
          placeholder="Type title here"
        />
      </View>
      <View
        style={[styles.sendButtonContainer, { backgroundColor: '#e0e0e0' }]}
      >
        <View style={[styles.sendButton, styles.neuButtonSecondShadow]}>
          <TouchableOpacity
            style={[styles.sendButton, styles.neuButton]}
            onPress={sendPhoto}
          >
            <MaterialCommunityIcons
              name="email-send-outline"
              size={'48%'}
              color="#696969"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // <StatusBar style="auto" />
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: '1%',

    // margin: '1%',
    // marginHorizontal: 'auto',
    backgroundColor: '#e0e0e0',
  },
  camera: {
    flex: 1,
    // height: '70%',
    // marginTop: '10%',
    // position: 'relative',
    // marginHorizontal: '1%',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    borderRadius: '8%',
    width: '100%',
    // backgroundColor: 'blue',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  segment: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: '4%',
    // width: 75,
    // height: 75,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: '50%',
    // backgroundColor: '#dc143c',
    // alignItems: 'center',
    // justifyContent: 'center',

    width: 200,
    height: 70,
    marginTop: 50,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeuomorphicButton: {
    height: 75,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 37.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  skeumorphicGradientStyling: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeuomorphicShift: {
    position: 'absolute',
    width: 200,
    height: 75,
    top: 0,
    left: 0,
    zIndex: -1,
    borderRadius: 37.5,
  },
  text: {
    color: '#fff',
    fontSize: '15%',
  },
  imageContainer: {
    // position: 'absolute',
    // top: 50,
    // left: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: '50%',
    justifyContent: 'flex-end',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
  },
  inputContainer: {
    width: '98%',
    // borderColor: 'red',
    // borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: '1%',
    backgroundColor: 'white',
    // marginHorizontal: '2%',
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.5%',
  },
  inputText: {
    // height: '10%',
    fontSize: '20%',
    fontFamily: 'DMMono-Regular',
    paddingVertical: '4%',
  },
  // segment: {
  //   flex: 1,
  //   width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  sendButtonContainer: {
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',

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
    // marginTop: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',

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
  // sendText: {
  //   color: '#dc143c',
  //   fontSize: '20',
  //   marginHorizontal: 'auto',
  // },
});
