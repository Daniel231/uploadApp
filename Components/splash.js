import React from 'react';
import { StyleSheet , View, Image, Dimensions, AsyncStorage} from 'react-native';
 
export default class Splash extends React.Component {
  componentDidMount() {
        setTimeout(() => {
            AsyncStorage.getItem('userData', (err, userData) => {
                if(userData){
                  this.setState(JSON.parse(userData))
                  this.props.navigation.navigate("Home");        
                } else {
                    this.props.navigation.navigate("Login")
                }
              });
        }, 2000);
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