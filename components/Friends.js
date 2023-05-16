import { StatusBar } from 'expo-status-bar';
import { 
  ScrollView,
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const Friends = ({baseUrl, user, users}) => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);


  return (
    <ScrollView height={WINDOW_HEIGHT} paddingTop={50}>
      <View flexDirection={"row"} justifyContent={"center"}>
        <TextInput 
          placeholder='Search for friend...' 
          onChange={val => setSearch(val)} 
          onFocus={() => setSearching(true)} 
          fontSize={20}
          marginLeft={30}
        ></TextInput>
        {searching ? 
        <TouchableOpacity onPress={() => setSearching(false)}>
          <AntDesign name='close' size={25} marginHorizontal={10}/>
        </TouchableOpacity>
        : <></>}
      </View>
      {!searching ? 
      <View>
        <Text>Incoming</Text>
        {}
        <Text>Requested</Text>
        {}
        <Text>Added</Text>
        {users.filter(u => user.data.friends.indexOf(u._id) >= 0)
          .map(u => 
            <View flexDirection={"row"}>
              <View marginVertical={5} marginLeft={10}>
                <Text>{u.data.username}</Text>
                <Text style={{color: "#a29f9f"}}>{u._id}</Text>
              </View>
            </View>
          )
        }
      </View>
      : <Text>Search criteria matches</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Friends;