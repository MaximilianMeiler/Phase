import Home from './components/Home'
import CameraScr from "./components/CameraScr"
import Friends from "./components/Friends"
import Signin from "./components/Signin"
import User from "./components/User"
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
  const [user, setUser] = useState({data: {username: ""}});
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [flag, setFlag] = useState(0);

  var postColor = appPage == 'C' ? "#fff" : "#dbdbdb"
  var friendsColor = appPage == 'F' ? "#fff" : "#dbdbdb"
  var homeColor = appPage == 'H' ? "#fff" : "#dbdbdb"
  var userColor = appPage == 'U' ? "#fff" : "#dbdbdb"

  const getID = async () => {
    UUID = await SecureStore.getItemAsync('secure_deviceid');
  }

  const loadPosts = async () => {
    let results = await fetch(`${baseUrl}/posts`).then(resp => resp.json());
    setPosts(results.reverse());
  }

  const loadUsers = async () => {
    let results = await fetch(`${baseUrl}/users`).then(resp => resp.json());
    setUsers(results);
  }

  useEffect(() => { //runs on first load
    getID();
    loadPosts();
    loadUsers();
    var matches = users.filter(u => u._id == user._id);
    if (matches.length > 0) {
      setUser(matches[0])
    }
    console.log("DATA FETCHED");
  }, [user.data.username, appPage, flag]);

  const activeScreen = () => {
    if (appPage == 'H') {
      return <Home posts={posts} users={users}/>
    } else if (appPage == 'C') {
      return <CameraScr baseUrl={baseUrl} user={user}/>
    } else if (appPage == "F") {
      return <Friends baseUrl={baseUrl} user={user} users={users} flag={flag} setFlag={setFlag}/>
    } else if (appPage == "U") {
      return <User baseUrl={baseUrl} user={user} users={users} flag={flag} setFlag={setFlag}/>
    }
  }

  const footer = () => {
    return (
      <View style={styles.footer} backgroundColor={'#c8c8c8'}>
        <TouchableOpacity style={{backgroundColor: friendsColor}} onPress={() => setAppPage('F')}>
          <Text style={styles.sideBox}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: postColor}} onPress={() => setAppPage('C')}>
          <Text style={styles.midBox}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: homeColor}} onPress={() => setAppPage('H')}>
          <Text style={styles.midBox}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: userColor}} onPress={() => setAppPage('U')}>
          <Text style={styles.sideBox}>User</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
      <View flexDirection={'column'}>
        <Signin user={user} setUser={setUser} baseUrl={baseUrl}/>
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
