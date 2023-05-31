
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
} from 'react-native';
import { getCalendars } from 'expo-localization';

var locale = getCalendars()[0];

const Post = ({post, users}) => {

  const parseDate = () => {
    var d = new Date(post.date)
    var n = new Date(Date.now())
    var region = locale.calendar;
    var zone = locale.timeZone;

    var options = {
      timeZone: zone,
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    var optional = {
      year: "numeric"
    }

    if (d.getFullYear() != n.getFullYear()) { //makes old posts show year
      Object.assign(options, optional)
    }    

    return (d.toLocaleString(region, options))
  }

  return (
    users.length > 0 ?
    <View marginVertical={10}>
      {Object.hasOwn(post.data, "title") ?
          <Text style={{fontWeight:"bold", fontSize:25}}>{post.data.title}</Text>
      : <></>}
        
      <View flexDirection={"row"} justifyContent={"space-between"}>
        {Object.hasOwn(post.data, "poster") ?
          <Text style={{fontSize:18}}>{users.filter(u => u._id == post.data.poster)[0].data.username}</Text>
        : <></>}
        {Object.hasOwn(post, "date") ?
          <Text style={{fontSize:16}}>{parseDate()}</Text>
        : <></>}
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
    :<></>
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