import React from 'react';
import { StyleSheet , View, Image, Dimensions} from 'react-native';
 
export default class Splash extends React.Component {
  componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate("Intro")
        }, 3000);
    }
  render() {
    return (
        <View style={{ flex: 1 , alignItems: 'stretch'}}>
            <Image source={require('../assets/images/splash.png')} style= {styles.icon}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    icon: {
        width: Dimensions.get('window').width ,
        height: Dimensions.get('window').height,
        resizeMode: "contain"
    }
});