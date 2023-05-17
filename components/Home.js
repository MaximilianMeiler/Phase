import { StatusBar } from 'expo-status-bar';
import { 
  ScrollView,
  StyleSheet, 
  Text, 
  View, 
  Image,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Post from "../components/Post"

const WINDOW_HEIGHT = Dimensions.get('window').height;

const Home = ({posts, users}) => {

  return (
    <ScrollView height={WINDOW_HEIGHT} >
      <View style={styles.container} marginTop={30} marginBottom={80}>
        {posts.map(post => 
          <Post post={post} users={users} key={post._id}/>
        )}
      </View> 
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

export default Home;