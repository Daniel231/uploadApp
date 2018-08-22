import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider-rtl';
 
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  }
});
 
const slides = [
  {
    key: 'somethun',
    title: 'כותרת 1',
    text: 'לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב.\nהיושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף.',
    img: require('../assets/images/c1.png'),
    imgStyle: {
      height: 80 * 2.5,
      width: 109 * 2.5,
    },
    backgroundColor: '#fa931d',
    fontColor: '#fff',
    level: 10,
  },
];
 
export default class Intro extends React.Component {
  // componentWillMount() {
  //   AsyncStorage.getItem('userIntro', (err, userIntro) => {
  //     if(userIntro){
  //       this.props.navigation.navigate("Home");        
  //     } else {
  //       AsyncStorage.setItem('userIntro', true);
  //     }
  //   });
  // }    
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