import React from 'react';
import { StyleSheet, Text, View , Modal, AsyncStorage, ImageBackground, Linking} from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {url, api_key, api_secret} from '../cloudinaryDetails.js'
import PercentageCircle from 'react-native-percentage-circle';  
import { Container, Content, Textarea,Header, Form, Label,Right,Input, Card, CardItem, Body, Button, Icon} from "native-base";

export default class Videos extends React.Component {
  state = {
      text:"",
      video:{},
      circylePercent:0, 
      percentCirculeVisible: false, 
      username:""};

  uploadVideo() {
    console.log("start")
    let timestamp = (Date.now() / 1000 | 0).toString();
    // let hash_string = 'context=key=a&timestamp=' + timestamp + api_secret --> upload with key value
    // let hash_string = 'tags=browser_upload&timestamp=' + timestamp + api_secret --> upload with tag
    let hash_string = 'context=username=' + this.state.username + '&timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString()
    var fd = new FormData();
    fd.append('timestamp', timestamp);
    fd.append('api_key', api_key);
    fd.append('signature', signature);
    // fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('context', 'username=' +this.state.username); // Optional - add key and value for image admin in Cloudinary
    fd.append("file", {uri: this.state.video , type: 'video/mp4', name: `video_1.mp4`});
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onUploadProgress: (progressEvent) => {
        // Do whatever you want with the native progress event
        // console.log('progressEvent', progressEvent);
        var progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
        this.setState({percentCirculeVisible: true})
        this.setState({circylePercent: progress})
        console.log(`onUploadProgress progressEvent.loaded: ${progressEvent.loaded},
      progressEvent.total: ${progressEvent.total}`);
      }
    };
    axios.post(url, fd, config)
      .then((res) => {
        console.log('res', res)
        this.setState({percentCircule: false})
        alert("succes!")
        this.props.navigation.navigate('Home');
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

    return (
      <Container>
        <Header>
          <Icon name="menu" onPress={() => this.props.navigation.toggleDrawer()} style={{color:"white", top:15, left: 15}}/>
          <Body style={{left: 30}}>
            <Text style={{color: "white", fontSize:20}}>פרטי סירטון</Text>
          </Body>
        </Header>
      <Content padder>
          <Card transparent>
            <CardItem header>
              <Text>פרטי הסירטון</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Form style={{width: 300}}>
                  <Label>גיל הילד</Label>
                  {this.state.video.url ?
                  <Text style={{direction:"rtl"}}>{this.state.video.context.custom.kidAge}</Text>
                  :
                  <Input style={{width: 60, direction:"rtl", borderBottomWidth:1, bottom: 10}} keyboardType = 'numeric' onChangeText = {(age)=> this.onChanged(age)} value = {this.state.age}/>
                  }
                  <Label>הערות</Label>
                  {this.state.video.url ?
                  <Textarea editable={false} rowSpan={5} bordered value={this.state.video.context.custom.videoInfo}/>
                  :
                  <Textarea rowSpan={5} bordered placeholder="יש למלא עד 200 תווים.." maxLength={200} onChangeText={(text) => this.setState({text:text})} value={this.state.text}/>
                  }
                  {this.state.video.url ?
                  <CardItem button cardBody onPress={() => Linking.openURL(this.state.video.url)} style={{top: 10}}>
                      <ImageBackground source={{uri: this.state.video.url.replace(".mp4",".jpg")}} style={{height: 200, width: null, flex: 1,}}/>
                      <Icon type="FontAwesome" name="play-circle" style={{position: "absolute", left: 120, color:"white", fontSize:50, width: 50}}/>
                  </CardItem>
                  :
                    null
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
            <PercentageCircle radius={35} percent={this.state.circylePercent} color={"#3498db"}></PercentageCircle>
          </View>
        </View>
      </Modal>
      </Container>
      );
  }
}

const styles = StyleSheet.create({
});
