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
import { useState } from 'react';

const baseUrl = "https://testapi-silk-eight.vercel.app";

const WINDOW_HEIGHT = Dimensions.get('window').height;
var UUID;

const newUser = async (data) => {
  await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      data
    })
  }).then(resp => resp.json());
}

const updateID = async (name) => {
  //ADD CHECKS TO ENSURE VALID NAME

  UUID = await SecureStore.getItemAsync('secure_deviceid');
  if (!UUID) {
    let UUID = uuidv4();
    await SecureStore.setItemAsync('secure_deviceid', JSON.stringify(UUID));
  }

  newUser({ 
    username: name,
    deviceID: UUID,
  })
};


const Signin = () => {
  const [name, setName] = useState("");

  return (
    <View height={WINDOW_HEIGHT} justifyContent={'center'} alignItems={'center'}>
      <Text>Enter your username:</Text>
      <TextInput placeholder='SwagLord420' onChangeText={val => setName(val)}></TextInput>
      <Button title="Save" onPress={() => updateID(name)}></Button>
    </View>
  )
}

export default Signin;