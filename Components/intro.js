import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
 
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  },
  text: {
    textAlign: 'left',
  },
});

const text =`The goal of this application is to record short movie of the child in order to analyze his symptoms. 


Recording instructions: 

1 In at least 60 seconds of the movie the recording should be in distance of 20 cm, the frame should contain the whole face and facial expressions and eyes movement should be seen clearly.
2 Another at least one minute of the movie should be recording in distance of 1 meter when the baby lies on his/her back. the frame should contain the whole body.`
 
const slides = [
  {
    key: 'somethun',
    title: 'instructions',
    text,
    textStyle: styles.text,
    img: require('../assets/images/c1.png'),
    imgStyle: {
      height: 80 * 2.5,
      width: 109 * 2.5,
    },
    backgroundColor: '#2e419f',
    fontColor: '#0000',
    level: 10,
  },
];
 
export default class Intro extends React.Component {
  _onDone = () => {
    this.props.navigation.navigate("Home")
  }
  
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        doneLabel="Finish"
      />
    );
  }
}