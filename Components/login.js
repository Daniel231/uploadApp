import React from 'react';
import {AsyncStorage, StatusBar, Platform, Text, View, Button, StyleSheet, Image } from 'react-native';
import Auth0 from 'react-native-auth0';
import axios from 'axios';

const auth0 = new Auth0({ domain: 'uploadapp.eu.auth0.com', clientId: 'EdO35gxmDl3r3YcvE7x4WkrKEhN6s4Xd' });

export default class Login extends React.Component {
  state = {
    accessToken: null,
    avatar: null,
    name: null,
    showLoginButton: true
  }

  componentWillMount = () => {
    this.handleLogout(); 
  }

  handleLogin = () => {
    this.setState({showLoginButton: false})

    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: 'https://uploadapp.eu.auth0.com/userinfo'})
      .then((credentials) => {
        auth0
          .auth
          .userInfo({token: credentials.accessToken})
          .then((user) => {
            axios.post("https://videos-diagnosis.herokuapp.com/diagnosis", {userName: user.nickname})
            .then((response) => {
              const userData = {
                accessToken: credentials.accessToken,
                avatar: user.picture,
                name: user.nickname
              }
  
              AsyncStorage.setItem('userData',JSON.stringify(userData),
                () => {this.setState(userData)
                this.props.navigation.navigate("Intro")},
                (error) => console.err(error)
              );
            })
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error));
  }

  handleLogout = () => {
    this.setState({
      accessToken: null,
      avatar: null,
      name: null
    });
    AsyncStorage.clear()
  }

  renderStatusBar = () => <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />;

  render = () => {
    var styles = StyleSheet.create({
      container: {
          flex: 1,
          flexDirection: 'column'
      },
      halfHeight: {
          flex: 5,
          backgroundColor: 'white',
          alignItems: 'center',
      },
      quarterHeight: {
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
      },
      logo: {
       margin:'auto',
       position: 'relative',
       top: 20,
       width:400,
       height:400
    }
  });

    const { accessToken, showLoginButton } = this.state;    
    return (
  <View style={styles.container}>
  
      <View style={styles.halfHeight} >
        <Image  style={styles.logo} source={require('../assets/images/appIcon.jpeg')} />
  </View>
        
      <View style={styles.quarterHeight} >
     {showLoginButton && <Button
                     title={accessToken ? 'Logout' : 'Login'}
                     onPress={accessToken ? this.handleLogout : this.handleLogin}
                     style={styles.loginButton}
                />
     }
                {/* <Button
                   title={'Next - for debugging only'}
                    onPress={() => {this.props.navigation.navigate("Intro")}}
                    style={styles.loginButton}
               /> */}
  </View>
      
  </View>
    );
  };
}