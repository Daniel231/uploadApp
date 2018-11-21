import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import Videos from './Components/Videos';
import Intro from './Components/intro';
import Splash from './Components/splash';
import VideoFileds from './Components/VideoFileds';
import Login from './Components/login';
import Results from './Components/results';
import Settings from './Components/settings';
import { strings } from './locales/i18n';
import I18n from 'react-native-i18n';

import { createDrawerNavigator } from 'react-navigation';


export default class App extends React.Component {
  
  componentWillMount = () =>{
    AsyncStorage.getItem('settings', (err, settings) => {
      if(settings){
        I18n.locale = JSON.parse(settings).language;
        this.forceUpdate()
      }
    });
  }
   
  render() {
    RootStack = createDrawerNavigator({
      Home: {
        screen: Videos,
        navigationOptions: {
          drawerLabel: strings('labels.videos') 
        }
      },
      Results: {
        screen: Results,
        navigationOptions: {
          drawerLabel: strings('labels.results')
        }
      },
      Intro: {
        screen: Intro,
        navigationOptions: {
          drawerLabel: strings('labels.intro'),
          drawerLockMode: "locked-open"
        }
      },
      Settings: {
        screen: Settings,
        navigationOptions: {
          drawerLabel: strings('labels.settings'),
          drawerLockMode: "locked-open"
        }
      },
      Logout: {
        screen: Login,
        navigationOptions: {
          drawerLabel: strings('labels.logout')
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
    )
    return (
      <RootStack />
    );
  }
}