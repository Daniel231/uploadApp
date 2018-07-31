import React from 'react';
import { StyleSheet } from 'react-native';
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
  {
    key: 'somethun-dos',
    title: 'כותרת 2',
    text: 'להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך.',
    img: require('../assets/images/2.png'),
    imgStyle: {
      height: 80 * 2.5,
      width: 109 * 2.5,
    },
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'בחור מגניב',
    text: 'מוסן מנת. להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורך.\n\nקולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף לורם איפסום דולור סיט אמט,',
    img: require('../assets/images/3.png'),
    imgStyle: {
      height: 80 * 2.5,
      width: 109 * 2.5,
    },
    backgroundColor: '#22bcb5',
  }
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
        doneLabel="סיום"
        nextLabel="הבא"
      />
    );
  }
}