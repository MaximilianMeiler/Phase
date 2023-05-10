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
var postColor, friendsColor, homeColor;

export default function App() {
  const [appPage, setAppPage] = useState('C');

  postColor = appPage == 'C' ? "#fff" : "#dbdbdb"
  friendsColor = appPage == 'F' ? "#fff" : "#dbdbdb"
  homeColor = appPage == 'H' ? "#fff" : "#dbdbdb"

  const activeScreen = () => {
    if (appPage == 'H') {
      return <Home/>
    } else if (appPage == 'C') {
      return <CameraScr/>
    }
  }

  return (
    <View flexDirection={'column'}>
      {activeScreen()}
      <View style={styles.footer} backgroundColor={'#c8c8c8'}>
        <TouchableOpacity style={{backgroundColor: friendsColor}} >
          <Text style={styles.sideBox}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: postColor}}>
          <Text style={styles.midBox}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: homeColor}} >
          <Text style={styles.sideBox}>Home</Text>
        </TouchableOpacity>
      </View>
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
