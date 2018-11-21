import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { strings } from '../locales/i18n';
import AppIntroSlider from 'react-native-app-intro-slider';
 
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  },
  text: {
    
  },
});
 
export default class Intro extends React.Component {

  slides = [
    {
      key: 'somethun',
      title: strings('intro.title'),
      text: strings('intro.text'),
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
  ]
  _onDone = () => {
    this.props.navigation.navigate("Home")
  }
  
  render() {
    return (
      <AppIntroSlider
        slides={this.slides}
        onDone={this._onDone}
        doneLabel= {strings('intro.finishBtn')}
      />
    );
  }
}