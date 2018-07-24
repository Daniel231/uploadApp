import React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'; // 0.18.0
import Icon from 'react-native-vector-icons/Feather'
import { Video } from 'expo';

export default class Videos extends React.Component {
  state = { fileds: [],video:{}, isLoaded: false};

  getFileds() {
    this.setState({ fileds: [{filed: "שדה 1", grade: 100},{filed: "שדה 2", grade: 92},{filed: "שדה 3", grade: 40},{filed: "שדה 4", grade: 85},{filed: "שדה 5", grade: 22}], isLoaded: true});
  }

  uploadVideo() {
    alert("succes!")
    this.props.navigation.navigate('Home');
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
