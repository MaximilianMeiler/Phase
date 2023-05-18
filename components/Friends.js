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
import Fuse from "fuse.js";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const Friends = ({baseUrl, user, users, flag, setFlag}) => {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const removeFriend = async (id1, id2) => {
    await fetch(`${baseUrl}/users/frienddel/${id1}/${id2}`, {
      method: "PATCH",
    }).catch((e) => console.log(e))

    await fetch(`${baseUrl}/users/frienddel/${id2}/${id1}`, {
      method: "PATCH",
    }).catch((e) => console.log(e))

      // frontend change
    users.filter(u => u._id == id1)[0].data.friends = 
      users.filter(u => u._id == id1)[0].data.friends.filter(r => r != id2);
    users.filter(u => u._id == id2)[0].data.friends = 
      users.filter(u => u._id == id2)[0].data.friends.filter(r => r != id1);
    setFlag(flag+1);
  }

  const acceptReq = async (id1, id2) => {
    await fetch(`${baseUrl}/users/friendadd/${id1}/${id2}`, {
      method: "PATCH",
    }).catch((e) => console.log(e))
    
    await fetch(`${baseUrl}/users/friendadd/${id2}/${id1}`, {
      method: "PATCH",
    }).catch((e) => console.log(e))

    removeReq(id2, id1);

    // frontend change
    users.filter(u => u._id == id1)[0].data.friends = 
      users.filter(u => u._id == id1)[0].data.friends.concat([id2]);
    users.filter(u => u._id == id2)[0].data.friends = 
      users.filter(u => u._id == id2)[0].data.friends.concat([id1]);

  }

  const removeReq = async (id1, id2) => {
    await fetch(`${baseUrl}/users/reqdel/${id1}/${id2}`, {
      method: "PATCH",
    }).catch((e) => console.log(e))

    // frontend change
    users.filter(u => u._id == id1)[0].data.requests = 
      users.filter(u => u._id == id1)[0].data.requests.filter(r => r != id2);
    setFlag(flag+1);
  }

  const addReq = async (id1, id2) => {
    await fetch(`${baseUrl}/users/reqadd/${id1}/${id2}`, {
      method: "PATCH",
    }).catch((e) => console.log(e))

    // frontend change
    users.filter(u => u._id == id1)[0].data.requests = 
      users.filter(u => u._id == id1)[0].data.requests.concat([id2]);
    setFlag(flag+1);
  }

  const displayResults = () => {

    var fuse = new Fuse(users, {keys: ["data.username"]} )
    var results = fuse.search(search)
    var filtered = results.filter(r => user.data.friends.indexOf(r.item._id) < 0 
      && user.data.requests.indexOf(r.item._id) < 0
      && r.item.data.requests.indexOf(user._id) < 0)

    return (
      filtered.map(r => {
        return (
          <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <View marginVertical={5} marginLeft={10}>
              <Text>{r.item.data.username}</Text>
              <Text style={{color: "#a29f9f"}}>{r.item._id}</Text>
            </View>
            <TouchableOpacity onPress={() => addReq(user._id, r.item._id)}>
              <AntDesign name='adduser' size={25} marginHorizontal={10}/>
            </TouchableOpacity>
          </View>
        )
      })
    )
  }

  return (
    <ScrollView height={WINDOW_HEIGHT} paddingTop={50}>
      <View flexDirection={"row"} justifyContent={"center"}>
        <TextInput 
          placeholder='Search for friend...' 
          onChangeText={val => setSearch(val)} 
          onFocus={() => setSearching(true)} 
          fontSize={20}
          marginLeft={30}
          marginBottom={20}
        ></TextInput>
        {searching ? 
        <TouchableOpacity onPress={() => {setSearching(false)}}>
          <AntDesign name='close' size={25} marginHorizontal={10}/>
        </TouchableOpacity>
        : <></>}
      </View>
      {!searching ? 
      <View marginLeft={10}>
        <Text>Incoming</Text>
        {users.filter(u => u.data.requests.indexOf(user._id) >= 0)
          .map(u => 
            <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <View marginVertical={5} marginLeft={10}>
                <Text>{u.data.username}</Text>
                <Text style={{color: "#a29f9f"}}>{u._id}</Text>
              </View>
              <View flexDirection={"row"}>
                <TouchableOpacity onPress={() => acceptReq(user._id, u._id)}>
                  <AntDesign name='checkcircleo' size={25} marginHorizontal={5}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeReq(u._id, user._id)}>
                  <AntDesign name='closecircleo' size={25} marginRight={10}/>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        <Text>Requested</Text>
        {users.filter(u => user.data.requests.indexOf(u._id) >= 0)
          .map(u => 
            <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <View marginVertical={5} marginLeft={10}>
                <Text>{u.data.username}</Text>
                <Text style={{color: "#a29f9f"}}>{u._id}</Text>
              </View>
              <TouchableOpacity onPress={() => removeReq(user._id, u._id)}>
                <AntDesign name='deleteuser' size={25} marginHorizontal={10}/>
              </TouchableOpacity>
            </View>
          )
        }
        <Text>Added</Text>
        {users.filter(u => user.data.friends.indexOf(u._id) >= 0)
          .map(u => 
            <View flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <View marginVertical={5} marginLeft={10}>
                <Text>{u.data.username}</Text>
                <Text style={{color: "#a29f9f"}}>{u._id}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFriend(user._id, u._id)}>
                <AntDesign name='deleteuser' size={25} marginHorizontal={10}/>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
      : 
      <View>
        {displayResults()}
      </View>
      }
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