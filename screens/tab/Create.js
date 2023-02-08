import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';

export default function CreateScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    navigation.navigate('Posts', { photo });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200, borderRadius: 10 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Snap</Text>
        </TouchableOpacity>
      </Camera>
      <View>
        <TouchableOpacity style={styles.sendButton} onPress={sendPhoto}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  camera: {
    // flex: 1,
    height: '70%',
    marginTop: '16%',
    // position: 'relative',
    marginHorizontal: '1%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: '12%',
  },
  button: {
    position: 'absolute',
    bottom: '4%',
    width: 75,
    height: 75,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: '50%',
    backgroundColor: '#dc143c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: '15%',
  },
  imageContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
  },
  sendButton: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: '#dc143c',
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#dc143c',
    fontSize: 20,
  },
});
