import React from 'react';
import { StyleSheet, Text, View , Modal, AsyncStorage, ImageBackground, Linking, BackHandler, Picker, TextInput, Alert} from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {url, api_key, api_secret} from '../cloudinaryDetails.js'
import Pie from 'react-native-progress/Pie'
import { Container, Content, Textarea,Header, Form, Label,Right,Input, Card, CardItem, Body, Button, Icon, Left} from "native-base";
// import SnackBar from 'react-native-snackbar-dialog'
import { strings } from '../locales/i18n';

export default class Videos extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  state = {
    videoInfo:"",
    video:{},
    circylePercent:0, 
    percentCirculeVisible: false, 
    username:"",
    ageKind:"Months"};

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      this.props.navigation.navigate("Home");
      return true;
  }

  uploadVideo() {
    let data = {age: this.state.age, videoInfo: this.state.videoInfo, ageKind: this.state.ageKind, videoName: this.state.video.name}
    let timestamp = (Date.now() / 1000 | 0).toString();
    // let hash_string = 'context=key=a&timestamp=' + timestamp + api_secret --> upload with key value
    // let hash_string = 'tags=browser_upload&timestamp=' + timestamp + api_secret --> upload with tag
    let hash_string = 'context=username=' + this.state.username+ "|data=" +  JSON.stringify(data) + '&timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString()
    var fd = new FormData();
    fd.append('timestamp', timestamp);
    fd.append('api_key', api_key);
    fd.append('signature', signature);
    // fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('context', 'username=' +this.state.username + "|data=" + JSON.stringify(data)); // Optional - add key and value for image admin in Cloudinary
    fd.append("file", {uri: this.state.video.uri , type: 'video/mp4', name: `video_1.mp4`});
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onUploadProgress: (progressEvent) => {
        // Do whatever you want with the native progress event
        // console.log('progressEvent', progressEvent);
        var progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
        this.setState({percentCirculeVisible: true})
        this.setState({circylePercent: progress / 100})
        console.log(`onUploadProgress progressEvent.loaded: ${progressEvent.loaded},
      progressEvent.total: ${progressEvent.total}`);
      }
    };
    axios.post(url, fd, config)
      .then((res) => {
        console.log('res', res)
        this.setState({percentCircule: false})
        this.props.navigation.navigate('Home');
       
        // SnackBar.show('Video successfuly uploaded!', {
        //   backgroundColor: '#3f51b5',
        //   textColor: 'white',
        //   duration: 1000
        // })
      })
      .catch((err) => {
        console.error('err', JSON.stringify(err));
        this.setState({percentCircule: false})
        alert("fail!")
      });
  }

   componentDidMount() {
    AsyncStorage.getItem('userData', (err, userData) => {
      if(userData){
        console.log('initial Data',userData);
        this.setState({username: JSON.parse(userData).name})
      }
    })
    const { navigation } = this.props;
    this.setState({video: navigation.getParam('video', 'NO-ID')})
  }
  
  onChanged(age) {
    this.setState({age: age})
  }

  render() {
    let videoData = this.state.video.url && JSON.parse(this.state.video.context.custom.data);
    return (
      <Container>
        <Header>
          <Body style={{left: 70}}>
            <Text style={{color: "white", fontSize:20}}>{strings("videoFileds.videoInformation")}</Text>
          </Body>
          <Icon name="md-arrow-round-back" onPress={() => this.props.navigation.navigate("Home")} style={{color:"white", top:15, right: 15}}/>
        </Header>
      <Content padder>
          <Card transparent>
            <CardItem>
              <Body>
                <Form style={{width: 300}}>
                  {this.state.video.url ?
                  <CardItem button cardBody onPress={() => Linking.openURL(this.state.video.url)} style={{bottom: 10}}>
                      <ImageBackground source={{uri: this.state.video.url.replace(".mp4",".jpg")}} style={{height: 200, width: null, flex: 1,}}/>
                      <Icon type="FontAwesome" name="play-circle" style={{position: "absolute", left: 120, color:"white", fontSize:50, width: 50}}/>
                  </CardItem>
                  :
                    null
                  }
                  <Label>{strings("videoFileds.childrenAge")}Children age</Label>
                  {this.state.video.url ?
                  <Text>{videoData.age} {videoData.ageKind}</Text>
                  :
                  <View style={{flexDirection:"row"}}>
                    <Input style={{borderBottomWidth:1}} keyboardType = 'numeric' onChangeText = {(age)=> this.onChanged(age)} value = {this.state.age}/>
                    <Picker
                      mode="dropdown"
                      selectedValue={this.state.ageKind}
                      style={{ height: 50, width: 120 }}
                      onValueChange={(itemValue, itemIndex) => this.setState({ageKind: itemValue})}>
                      <Picker.Item label="Months" value="Months" />
                      <Picker.Item label="Years" value="Years" />
                    </Picker>
                  </View>
                  }
                  <Label>{strings("videoFileds.notes")}</Label>
                  {this.state.video.url ?
                  <Textarea editable={false} rowSpan={5} bordered value={videoData.videoInfo}/>
                  :
                  <Textarea rowSpan={5} bordered placeholder="You can fill up to 200 chars.." maxLength={200} onChangeText={(text) => this.setState({videoInfo:text})} value={this.state.videoInfo}/>
                  }
                </Form>
              </Body>
            </CardItem>
         </Card>
      </Content>
      {!this.state.video.url && <Button transparent large success style={{justifyContent:"center", alignSelf:"center", width: 250}} onPress={() => this.uploadVideo()}>
        <Icon name="md-cloud-upload" style={{fontSize:50}}/>
      </Button>}
      <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.percentCirculeVisible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}
      >
        <View style={{flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', backgroundColor: '#00000080'}}>
          <View>
            <Pie size={70} progress={this.state.circylePercent} color={"#3498db"}/>
          </View>
        </View>
      </Modal>
      </Container>
      )
  }
}

const styles = StyleSheet.create({
});
