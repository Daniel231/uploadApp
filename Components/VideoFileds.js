import React from 'react';
import { Button } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { StyleSheet, Text, View , Modal} from 'react-native';
import axios from 'axios'; // 0.18.0
// import Icon from 'react-native-vector-icons/Feather'
// import { Video } from 'expo';
import CryptoJS from 'crypto-js';
import {url, api_key, api_secret} from '../cloudinaryDetails.js'
import PopupDialog from 'react-native-popup-dialog';

export default class Videos extends React.Component {
  state = { fileds: [],video:{}, isLoaded: false};

  getFileds() {
    this.setState({ fileds: [{filed: "שדה 1", grade: 100},{filed: "שדה 2", grade: 92},{filed: "שדה 3", grade: 40},{filed: "שדה 4", grade: 85},{filed: "שדה 5", grade: 22}], isLoaded: true});
  }

  uploadVideo() {
    console.log("start")
    let timestamp = (Date.now() / 1000 | 0).toString();
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString()

    var fd = new FormData();
    fd.append('timestamp', timestamp);
    fd.append('api_key', api_key);
    fd.append('signature', signature);
    // fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", {uri: this.state.video , type: 'video/mp4', name: `video_1.mp4`});
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      onUploadProgress: (progressEvent) => {
        // Do whatever you want with the native progress event
        // console.log('progressEvent', progressEvent);
        var progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
        this.popupDialog.show();
        console.log(`onUploadProgress progressEvent.loaded: ${progressEvent.loaded},
      progressEvent.total: ${progressEvent.total}`);
      }
    };
    axios.post(url, fd, config)
      .then((res) => {
        console.log('res', res)
        alert("succes!")
        this.props.navigation.navigate('Home');
      })
      .catch((err) => {
        console.error('err', JSON.stringify(err));
      });
  }

   componentDidMount() {
    const { navigation } = this.props;
    this.setState({video: navigation.getParam('video', 'NO-ID')})
    this.getFileds()
  }
  render() {
    let {fileds} = this.state

    return (
        <View style={styles.container}>
        <Text style={styles.header}> העלאת וידיאו </Text>
          {this.state.isLoaded &&
          <View style={styles.fileds}>
          <Text >גיל הילד: 100</Text>
            {fileds.map((item,i) =>
          <Text key ={i}>{item.filed} : {item.grade}</Text>)}
          </View>}
          <Video
          source={{ uri: "http://res.cloudinary.com/unicodeveloper/video/upload/" +  this.state.video.public_id + "." + this.state.video.format}}
          useNativeControls= {true}
	        style={styles.clipStyle}
          />
          <View style={styles.btn}>
          <Icon.Button name="upload" onPress={() => this.uploadVideo()}/>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
  },
  fileds: {
    top: "5%"
  },
  btn: {
    position:"absolute",
    bottom:0
  },
  clipStyle: {
    top: "5%",
    width: 150,
    height: 150
  }
});
