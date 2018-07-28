import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Videos from './Components/Videos';
import Intro from './Components/intro';
import Splash from './Components/splash';
import VideoFileds from './Components/VideoFileds';
import Results from './Components/results';
require('react-devtools');
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator({
    Splash: {
      screen: Splash,
      navigationOptions: {header: null}
    },
    Intro: {
      screen: Intro,
      navigationOptions: {header: null}
    },
    Home: {
      screen: Videos,
      navigationOptions: {header: null}
    },
    Details: {
      screen: VideoFileds,
      navigationOptions: {header: null}
    },
    Results: {
      screen: Results,
      navigationOptions: {header: null}
    }
  },
  {
    initialRouteName: 'Intro',
  },
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}