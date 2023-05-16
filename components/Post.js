
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
} from 'react-native';

const Post = ({post}) => {
  return (
    <View marginVertical={10}>
      {Object.hasOwn(post.data, "title") ?
          <Text>{post.data.title}</Text>
        : <></>}
        
      <View flexDirection={"row"} justifyContent={"space-between"}>
        {Object.hasOwn(post.data, "poster") ?
          <Text>{post.data.poster}</Text>
        : <></>}
        <Text>{post.date.toString()}</Text>
      </View>

      <Image
        source={{
          uri: post.data.imageLink,
        }}
        width={300}
        height={400}
        resizeMode={"cover"}
      ></Image>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Post;