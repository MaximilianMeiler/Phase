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

const baseUrl = "https://testapi-silk-eight.vercel.app";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const Home = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    let results = await fetch(`${baseUrl}/posts`).then(resp => resp.json());
    setPosts(results);
  }

  useEffect(() => { //runs on first load
    loadPosts();
  }, []);

  return (
    <ScrollView height={WINDOW_HEIGHT} marginBottom={30}>
      <View style={styles.container} marginVertical={50}>
        {posts.map(post => <Image
            source={{
              uri: post.data.imageLink,
            }}
            style={{width: 200, height: 200}}
            key={post._id}
            marginVertical={10}
          />
        )}
        <StatusBar style="auto" />
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