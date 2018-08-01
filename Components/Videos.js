import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View} from 'react-native';
import axios from 'axios'; // 0.18.0
// import { Icon } from 'react-native-elements'
// import Upload from 'react-native-vector-icons/Feather'
// import { Video , ImagePicker} from 'expo';
import { createStackNavigator } from 'react-navigation';
import Video from 'react-native-video';
import {cloud_name, api_key, api_secret} from '../cloudinaryDetails.js'
import base64 from 'react-native-base64'

const VideosLayout = (props) => {
  const removeVideo = (index) => {
    props.removeVideo(index)
  }
    return(
      <View>
        <View style={styles.container}> 
          {props.videos.map((item,i) =>
            <View key={i}>
              <Video source={{ uri: item.url }} 
              style={styles.clipStyle}/>
              {/* <Icon containerStyle={{position:"absolute", backgroundColor:"white"}} name="close" onPress={() => removeVideo(i)}/>
              {item.public_id ? <Icon containerStyle={{position:"absolute", right:0, bottom:0,backgroundColor:"white"}} name="send"/> : 
                <Icon containerStyle={{position:"absolute", right:0, bottom:0,backgroundColor:"white"}}
                  name="update" onPress={() => props.navigation('Details', {video: item})}/>} */}
            </View>
          )}
        </View>
      </View>
    )
  }

const AddingVideos = (props) => {

  const removeVideo = (index) => {
    props.removeVideo(index)
  }

  return(
  <View>
    <View style={styles.container}>
      { props.videos &&
        props.videos.map((item,i) =>
        <View key={i}>
        <Video source={{ uri: item }} style={styles.clipStyle}/>
        {/* <Icon containerStyle={{position:"absolute", backgroundColor:"white"}} name="close" onPress={() => removeVideo(i)}/> */}
      </View>)
      }
    </View>
  </View>
  )
}

export default class Videos extends React.Component {
  state = { videos: [] , isLoaded: false, results: false};

  pickVideo = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes:"Videos",
    // });

    if (!result.cancelled) {
      this.setState(prevState => ({
        videos: [...prevState.videos,result.uri]
         }));
    }
  };

  getVideos() {
    const tok = api_key+":"+api_secret;
    const hash = base64.encode(tok);
    const Basic = 'Basic ' + hash;

    axios.get('https://api.cloudinary.com/v1_1/dtvoiy5lg/resources/video', {headers : { 'Authorization' : Basic }})
          .then(res => {
              let a = res.data.resources.splice(0,2)
              this.setState({ videos: a, isLoading: true});
          })
          .catch(err =>{
            console.log(err.response)
          });
  }

  removeVideo(index) {
    let {videos} = this.state
    videos.splice(index, 1)
    videos.length ? this.setState({videos: videos}) : this.setState({videos: videos, isLoading: false})
  }

   componentDidMount() {
    this.getVideos();
  }

  render() {
    let {videos} = this.state

    return (
      <View style={styles.main}>
        {this.state.isLoading ?
            <VideosLayout videos={videos} 
              navigation={(item, bla) => this.props.navigation.navigate(item, bla)} 
              removeVideo={(item) => this.removeVideo()}/> : 
              <AddingVideos videos={videos} pickVideo={() => this.pickVideo()} 
              removeVideo={(item) => this.removeVideo()}/>
        }
        {this.state.videos.length < 4 && 
          <Button title="הוסף סרטון מהמכשיר" onPress={this.pickVideo} style={styles.btn}/>}
        {this.state.results && <View style={{position:"absolute", bottom:0, width:"100%"}}>
          <Button
          title="תוצאות"
          onPress={() => {this.props.navigation.navigate("Results")} }
          color="#841584"
          />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    display:'flex',
    flexDirection: "column",
    justifyContent: 'center',
    height: "100%"
  },
  container: {
    display:'flex',
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: 'center',
  },
  btn: {
    flexDirection: "row",
    width: 150,
    height: 150,
    backgroundColor: "black"
  },
  clipStyle: {
    width: 150,
    height: 150,
    margin: 5,
  }
});
