import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import 'react-native-get-random-values'

const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);
const WINDOW_WIDTH = Dimensions.get('window').width;
var RATIO_UNIT;

const DIMENSION_RATIO = Camera.defaultProps.ratio.split(':');
if (WINDOW_HEIGHT / DIMENSION_RATIO[0] > WINDOW_WIDTH / DIMENSION_RATIO[1]) {
  RATIO_UNIT = WINDOW_WIDTH / DIMENSION_RATIO[1];
} else {
  RATIO_UNIT = WINDOW_HEIGHT / DIMENSION_RATIO[0]
}


const CameraScr = () => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
  useEffect(() => { //runs on first load
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;
  
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
  
        let base64Img = `data:image/jpg;base64,${source}`;
        let apiUrl =
          'https://api.cloudinary.com/v1_1/dkatw72ac/image/upload';
        let data = {
          file: base64Img,
          upload_preset: 'lpocrtuh'
        };
  
        fetch(apiUrl, { //this places image on cloudinary
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        })
          .then(async response => {
            let data = await response.json();
            if (data.secure_url) {
              // Post.create({
              //   imageLink: data.secure_url,
              // })
            }
          })
          .catch(err => {
            alert('Cannot upload');
          });
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    <View style={styles.container}>
      <Text>Loading camera...</Text>
    </View>
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button onPress={() => onHandlePermission()} title='Click to request access'></Button>
      </View>
    )
  }

  return (
    <View 
      backgroundColor={'#000'} 
      paddingTop={(WINDOW_HEIGHT - DIMENSION_RATIO[0]*RATIO_UNIT) / 4}
      paddingBottom={(WINDOW_HEIGHT - DIMENSION_RATIO[0]*RATIO_UNIT) / 4*3}
    >
      <Camera
        // useCamera2Api={true}
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
      <View >
        {isPreview && (
          <TouchableOpacity
            onPress={cancelPreview}
            style={styles.bottomButtonsContainer}
            activeOpacity={0.7}
          >
            <AntDesign name='close' size={40} bottom={25} left={18} color='#fff' />
          </TouchableOpacity>
        )}
        {!isPreview && (
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
            <MaterialIcons name='flip-camera-ios' size={40} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isCameraReady}
            onPress={onSnap}
            style={styles.capture}
          />
        </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // ...StyleSheet.absoluteFillObject,
    height: DIMENSION_RATIO[0] * RATIO_UNIT,
    width: DIMENSION_RATIO[1] * RATIO_UNIT,
  },
  text: {
    color: '#000'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    bottom: 0,
    right: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  },
});

export default CameraScr;