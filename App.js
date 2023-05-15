import Home from './components/Home'
import CameraScr from "./components/CameraScr"
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default function App() {
  const [appPage, setAppPage] = useState('H');

  var postColor = appPage == 'C' ? "#fff" : "#dbdbdb"
  var friendsColor = appPage == 'F' ? "#fff" : "#dbdbdb"
  var homeColor = appPage == 'H' ? "#fff" : "#dbdbdb"
  var userColor = appPage == 'U' ? "#fff" : "#dbdbdb"

  const activeScreen = () => {
    if (appPage == 'H') {
      return <Home/>
    } else if (appPage == 'C') {
      return <CameraScr/>
    }
  }

  const footer = () => {
    return (
      <View style={styles.footer} backgroundColor={'#c8c8c8'}>
        <TouchableOpacity style={{backgroundColor: friendsColor}} onPress={() => setAppPage('C')}>
          <Text style={styles.sideBox}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: postColor}} onPress={() => setAppPage('C')}>
          <Text style={styles.midBox}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: homeColor}} onPress={() => setAppPage('H')}>
          <Text style={styles.midBox}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: userColor}} onPress={() => setAppPage('H')}>
          <Text style={styles.sideBox}>User</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (

    <View flexDirection={'column'}>
      {activeScreen()}
      {footer()}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: WINDOW_WIDTH,
    justifyContent: 'center',
  },
  sideBox: {
    fontSize: 20,
    width: 100,
    paddingVertical: 10,
    textAlign: 'center'
  },
  midBox: {
    fontSize: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
