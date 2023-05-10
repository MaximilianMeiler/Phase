import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image} from 'react-native';

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{marginTop:200}}>Home text</Text>
        <Image
          source={{
            uri: 'https://stardewvalleywiki.com/mediawiki/images/b/b2/Animals_Icon.png',
          }}
          style={{width: 200, height: 200}}
        />
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