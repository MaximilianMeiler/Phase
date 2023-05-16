import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import { useState, useEffect } from 'react';

const WINDOW_HEIGHT = Dimensions.get('window').height;
var UUID;


const Signin = ({user, setUser, baseUrl}) => {
  const [textVal, setTextVal] = useState("Unnamed User");

  const newUser = async (data) => {
    //ADD CHECKS TO ENSURE VALID NAME

    await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        data
      })
    }).then(resp => resp.json());

    let user = await fetch(`${baseUrl}/users/${UUID}`).then(resp => resp.json())
      .catch((e) => console.log(e));
    if (user) {
      setUser(user);
    }
  }

  const updateID = async () => {
    UUID = await SecureStore.getItemAsync('secure_deviceid');
    if (UUID == "0" || !UUID) {
      UUID = uuidv4();
      await SecureStore.setItemAsync('secure_deviceid', UUID);

      newUser({ 
        username: textVal,
        deviceID: UUID,
        friends: [],
        requests: [],
      })
    } else {
      login();
    }
  };

  const login = async () =>  {
    UUID = await SecureStore.getItemAsync('secure_deviceid');
    if (UUID == "0" || !UUID) {
      alert("No account detected!")
    } else {
      let user = await fetch(`${baseUrl}/users/${UUID}`).then(resp => resp.json())
        .catch((e) => console.log(e));
      if (user) {
        setUser(user);
      } else {
        await SecureStore.setItemAsync('secure_deviceid', "0");
        alert("The account data stored on your phone does not align with the accounts on the database. Please register a new account.");
      }
    }
  }

  return (
    user.data.username.length == 0 ?
      <View height={WINDOW_HEIGHT} justifyContent={'center'} alignItems={'center'}>
        <Button title="Login" onPress={() => login()}></Button>
        <Text>Or, enter a username to signup:</Text>
        <TextInput placeholder='SwagLord420' onChangeText={val => setTextVal(val)} ></TextInput>
        <Button title="Register" onPress={() => updateID()}></Button>
      </View>
    : <></>
  )
}

export default Signin;