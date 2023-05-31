import { StatusBar } from 'expo-status-bar';
import { 
  ScrollView,
  StyleSheet, 
  Text, 
  View, 
  Image,
  Dimensions,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react'; 
import ScreenAudioRecorder from 'react-native-screen-audio-recorder';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const options = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  fileName: 'audio.wav',
  fromMic: false,
  saveFile: false,
  audioEmitInterval: 1000
};

const User = ({baseUrl, user, users, flag, setFlag}) => {

  // useEffect(() => {

  //   ScreenAudioRecorder.on('data', (data) => {
  //     console.log(data);
  //   });
  // }, []);

  // const start = () => {
  //   ScreenAudioRecorder.init(options);
  //   ScreenAudioRecorder.start();
  // };

  // const stop = async () => {
  //   const filePath = await ScreenAudioRecorder.stop();
  //   setAudioFile(filePath);
  // };

  // return (
  //   <ScrollView height={WINDOW_HEIGHT} >
  //     <View marginTop={50}>
  //       <Button  title="start" onPress={() => start()}></Button>
  //     </View>
  //   </ScrollView>
  // );

  return (
    <ScrollView height={WINDOW_HEIGHT} justifyContent="center" alignItems="center">
      <View marginHorizontal={30}>
        <Text style={{textAlign:"center", fontSize:30, fontWeight:"bold"}} marginBottom={25}>{"PAGE IN PROGRESS"}</Text>
        <Text style={{textAlign:"center", fontSize:30}}>{"The ability to edit user settings will be introduced in a future update!"}</Text>
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

export default User;