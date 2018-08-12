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
    Home: {
      screen: Videos,
      navigationOptions: {
        drawerLabel: "סרטונים"
      }
    },
    Results: {
      screen: Results,
      navigationOptions: {
        drawerLabel: "תוצאות"
      }
    },
    
    Details: {
      screen: VideoFileds,
      navigationOptions: {
        drawerLabel: () => {},
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLabel: () => {},
        drawerLockMode: 'locked-close'
      }
    },  
    Splash: {
      screen: Splash,
      navigationOptions: {
        drawerLabel: () => {},
        drawerLockMode: 'locked-close'
      }
    },
    Intro: {
      screen: Intro,
      navigationOptions: {
        drawerLabel: () => {},
        drawerLockMode: 'locked-close'
      }
    },
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