import React from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView, Button} from 'react-native';

import { Container, Content, Picker, Text, Header, Body, Icon } from 'native-base';
import { strings, switchLanguage } from '../locales/i18n';
import I18n from 'react-native-i18n';


 
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  },
  text: {
    textAlign: 'left',
  },
});
 
export default class Settings extends React.Component {
    state= {language: I18n.currentLocale()}

    saveChanges(){
        switchLanguage(this.state.language, this);
       
   }
    render() {
    return (
        <Container>
        <Header>
          <Body style={{left: 130}}>
            <Text style={{color: "white", fontSize:20}}>{strings('settings.title')}</Text>
          </Body>
          <Icon name="menu" onPress={() => this.props.navigation.toggleDrawer()} style={{color:"white", top:15, right: 15}}/>
        </Header>
        <Content>
            <Text> {strings('settings.selectLanguage')}</Text>
            <Picker
                selectedValue={this.state.language}
                style={{ height: 50, width: 300 }}
                onValueChange={(itemValue, itemIndex) => {this.setState({language: itemValue})}}
                >
                <Picker.Item label="english" value="en" />
                <Picker.Item label="中文" value="zh" />
            </Picker>
            <Button
            onPress= {this.saveChanges.bind(this)}
                title={strings('settings.saveBtn')}
                />
        </Content>
        </Container>
    );
  }
}