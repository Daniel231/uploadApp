import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Videos from './Components/Videos';
import VideoFileds from './Components/VideoFileds';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Videos/>
      </View>
    );
  }
}
