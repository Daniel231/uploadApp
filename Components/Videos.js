import React from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView} from 'react-native';
import axios from 'axios';
import {cloud_name, api_key, api_secret} from '../cloudinaryDetails.js'
import base64 from 'react-native-base64'
import VideoCard from "./VideoCard"
import AddVideo from "./AddVideo"
import { Container, Header, Button, Icon, Right, Left, Spinner, Body, Content, Text} from 'native-base';

export default class Videos extends React.Component {

  state = { videos: [] , isLoaded: false, results: false, userData:"a"};

  componentDidMount() {
    AsyncStorage.getItem('userData', (err, userData) => {
      if(userData){
        this.setState({userData: JSON.parse(userData).name})
        const { navigation } = this.props;
        let bla = navigation.getParam('video', 'NO-ID')
        if(bla != 'NO-ID') {
          this.getVideos();
          this.setState(prevState => ({
            videos: [...prevState.videos,bla]
          }));
        } else {
          this.getVideos();
        }
      }
    });
  }

  getVideos() {
    const tok = api_key+":"+api_secret;
    const hash = base64.encode(tok);
    const Basic = 'Basic ' + hash;
    const url = 'https://api.cloudinary.com/v1_1/dtvoiy5lg/resources/video/context/?key=username&value=' + this.state.userData
    console.log(url)
    axios.get(url, {headers : { 'Authorization' : Basic }})
          .then(res => {
              this.setState({ videos: res.data.resources, isLoading: true});
          })
          .catch(err =>{
            console.log(err.response)
          });
  }

  removeVideo(videoItem) {
    let {videos} = this.state
    videos.splice(videos.indexOf(videoItem), 1)
    this.setState({videos: videos})
  }

  addVideo(item) {
    videoName = "Video " + (this.state.videos.length == 0 ? 1 : this.state.videos.length + 1)
    videoDetails = {name: videoName, path: item.path, uri: item.uri}
    this.setState(prevState => ({
      videos: [videoDetails,...prevState.videos]
    }));
  }

  render() {
    let {videos} = this.state

    return (
      <Container>
        <Header>
          <Body style={{left: 130}}>
            <Text style={{color: "white", fontSize:20}}>Videos</Text>
          </Body>
          <Icon name="menu" onPress={() => this.props.navigation.toggleDrawer()} style={{color:"white", top:15, right: 15}}/>
        </Header>
        {this.state.isLoading ?
        <Content>
          <Text style={{justifyContent:"center", alignSelf:"center"}}>Please upload 4 videos</Text>
          <ScrollView>
            {videos.length == 0 ?
              <AddVideo addVideo={(item) => this.addVideo(item)}/>
              :
              videos.length < 4 ?
                [videos.map((video, index) => <VideoCard navigation={(item, bla) => this.props.navigation.navigate(item, bla)} video={video} key={index} removeVideo={(item) => this.removeVideo()}/>) ,<AddVideo addVideo={(item) => this.addVideo(item)}/>]
                :
                videos.map((video, index) => <VideoCard navigation={(item, bla) => this.props.navigation.navigate(item, bla)} video={video} key={index} removeVideo={(item) => this.removeVideo()}/>)
            }
          </ScrollView>
        </Content>
        :
        <Body style={{alignContent:"center", justifyContent:"center"}}>
            <Spinner color='blue'/>
            <Text>Loading videos from server..</Text>
          </Body>}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
});
