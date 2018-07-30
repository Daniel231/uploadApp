import React from 'react';
import { StatusBar, Platform, Text, View, Button, StyleSheet } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'uploadapp.eu.auth0.com', clientId: 'EdO35gxmDl3r3YcvE7x4WkrKEhN6s4Xd' });

export default class Login extends React.Component {
  state = {
    accessToken: null,
    avatar: null,
    name: null
  }

  handleLogin = () => {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: 'https://uploadapp.eu.auth0.com/userinfo'})
      .then((credentials) => {
        auth0
          .auth
          .userInfo({token: credentials.accessToken})
          .then((user) => {
            this.setState({
              accessToken: credentials.accessToken,
              avatar: user.picture,
              name: user.nickname
            });
            this.props.navigation.navigate("Intro")
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
  }

  renderStatusBar = () => <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />;

  render = () => {
    const styles = StyleSheet.create({
        loginTextSection: {
           width: '100%',
           height: '30%',
        },
     
        loginButtonSection: {
           width: '100%',
           height: '30%',
           justifyContent: 'center',
           alignItems: 'center'
        },
     
        loginButton: {
          backgroundColor: 'blue',
          color: 'white'
        }
     })
    const { accessToken } = this.state;    
    return (
      <View style={styles.loginButtonSection}>
           <Button
                title={accessToken ? 'Logout' : 'Login'}
                onPress={accessToken ? this.handleLogout : this.handleLogin}
                style={styles.loginButton}
            />
    </View>
    );
  };
}


