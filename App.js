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
        drawerLabel: "Videos"
      }
    },
    Results: {
      screen: Results,
      navigationOptions: {
        drawerLabel: "Results"
      }
    },
    Intro: {
      screen: Intro,
      navigationOptions: {
        drawerLabel: "Guide",
        drawerLockMode: "locked-open"
      }
    },
    Logout: {
      screen: Login,
      navigationOptions: {
        drawerLabel: "Logout"
      }
    },
    Splash: {
      screen: Splash,
      navigationOptions: {
        drawerLabel: () => {},
        drawerLockMode: "locked-open"
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
        drawerLockMode: "locked-open"
      }
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}