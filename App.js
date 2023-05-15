import Home from './components/Home'
import CameraScr from "./components/CameraScr"
import Signin from "./components/Signin"
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';


const baseUrl = "https://testapi-silk-eight.vercel.app";


const WINDOW_WIDTH = Dimensions.get('window').width;
var UUID;

export default function App() {
  const [appPage, setAppPage] = useState('H');
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  var postColor = appPage == 'C' ? "#fff" : "#dbdbdb"
  var friendsColor = appPage == 'F' ? "#fff" : "#dbdbdb"
  var homeColor = appPage == 'H' ? "#fff" : "#dbdbdb"
  var userColor = appPage == 'U' ? "#fff" : "#dbdbdb"

  const getID = async () => {
    UUID = await SecureStore.getItemAsync('secure_deviceid');
  }

  const loadPosts = async () => {
    let results = await fetch(`${baseUrl}/posts`).then(resp => resp.json());
    setPosts(results);
  }

  const loadUsers = async () => {
    let results = await fetch(`${baseUrl}/users`).then(resp => resp.json());
    setUsers(results);
  }

  useEffect(() => { //runs on first load
    getID();
    loadPosts();
    loadUsers();
  }, [name, appPage]);

  const activeScreen = () => {
    if (appPage == 'H') {
      return <Home baseUrl={baseUrl} posts={posts}/>
    } else if (appPage == 'C') {
      return <CameraScr baseUrl={baseUrl}/>
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
        <Signin name={name} setName={setName} baseUrl={baseUrl}/>
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
