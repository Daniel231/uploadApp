import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'; // 0.18.0
import Icon from 'react-native-vector-icons/Feather'
import { Video } from 'expo';

export default class Videos extends React.Component {
  state = { fileds: [],video:{public_id:"rcqzlp00yewcgi71uace", format: "mp4"}, isLoaded: false};

  getFileds() {
    this.setState({ fileds: [{filed: "שדה 1", grade: 100},{filed: "שדה 2", grade: 92},{filed: "שדה 3", grade: 40},{filed: "שדה 4", grade: 85},{filed: "שדה 5", grade: 22}], isLoaded: true});
  }

  uploadVideo() {
    alert("succes!")
  }

   componentDidMount() {
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
          <Icon.Button name="upload" onPress={this.uploadVideo}/>
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
    paddingTop: "50%"
  },
  header: {
    fontSize: 20,
  },
  fileds: {
    top: "20%"
  },
  btn: {
    top: "100%"
  },
  clipStyle: {
    top: "50%",
    width: 150,
    height: 150
  }
});
