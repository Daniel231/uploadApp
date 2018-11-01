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
        <View style={{  flex: 5,
            backgroundColor: 'white',
            alignItems: 'center',  backgroundColor: 'white'}}>
            <Image source={require('../assets/images/appIcon.jpeg')} style= {styles.icon}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    icon: {
        position: 'relative',
        top: 20,
        width:400,
        height:400
        // width: Dimensions.get('window').width ,
        // height: Dimensions.get('window').height,
        // resizeMode: "contain"
    }
});