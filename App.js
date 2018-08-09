import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Videos from './Components/Videos';
import Intro from './Components/intro';
import Splash from './Components/splash';
import VideoFileds from './Components/VideoFileds';
import Login from './Components/login';
import Results from './Components/results';
import { DrawerNavigator } from 'react-navigation';

const RootStack = DrawerNavigator({
    Login: {
      screen: Login,
      navigationOptions: {header: null}
    },  
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
    initialRouteName: 'Home',
    drawerPosition: 'right'
  },
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}