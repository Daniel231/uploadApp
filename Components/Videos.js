import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View} from 'react-native';
import axios from 'axios'; // 0.18.0
import Icon from 'react-native-vector-icons/Feather'
import Video from 'react-native-video';
// import Video from 'react-native-af-video-player'
import ImagePicker from 'react-native-image-picker'
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
              <Video source={{uri:item.uri}}
              style={styles.clipStyle}/> 
              <Icon name="x-circle" style={{position:"absolute", left: 5, top: 5}} onPress={() => removeVideo(i)} size={20}/>
              {item.public_id ? <Icon style={{position:"absolute", right:5, bottom:5}} name="send" size={20}/> : 
                <Icon name="upload" style={{position:"absolute", right:5, bottom:5 }} size={20}
                   onPress={() => props.navigation('Details', {video: item})} />}
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

  selectVideoTapped() {
    const options = {
      title: 'בחירת וידיאו',
      takePhotoButtonTitle: 'צלם מהמצלמה',
      chooseFromLibraryButtonTitle:'בחר מגלריה',
      cancelButtonTitle:'ביטול',
      mediaType: 'video',
      videoQuality: 'medium'
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState(prevState => ({
          videos: [...prevState.videos,response.uri]
        }));
      }
    });
  }

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
          <Button title="הוסף סרטון מהמכשיר" onPress={() => this.selectVideoTapped()} style={styles.btn}/>}
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
