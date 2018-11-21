import React from 'react';
import { StyleSheet, View,BackHandler } from 'react-native';
import axios from 'axios'; // 0.18.0
import { Container, Content, Textarea,Header, Form, Label,Right,Input, Card, CardItem, Body, Button, Icon, Text} from "native-base";
import { strings } from '../locales/i18n';

export default class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  state = { fileds: [],isLoaded: false};

  getFileds() {
    this.setState({ fileds: [{filed: "שדה 1", grade: 100},{filed: "שדה 2", grade: 92},{filed: "שדה 3", grade: 40},{filed: "שדה 4", grade: 85},{filed: "שדה 5", grade: 22}], isLoaded: true});
  }

   componentDidMount() {
    this.getFileds()
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      this.props.navigation.navigate("Home");
      return true;
  }

  render() {
    let {fileds} = this.state

    return (
      <Container>
        <Header>
        <Body style={{alignItems: "center"}}>
            <Text style={{color: "white", fontSize:20}}>{strings('labels.results')}</Text>
          </Body>
          <Icon name="menu" onPress={() => this.props.navigation.toggleDrawer()} style={{color:"white", top:15, right: 15}}/>
        </Header>
            <Content style={{top: 150}}>
            <Card>
                <CardItem>
                <Body>
                <Text style={{fontSize: 50, alignSelf: "center", justifyContent:"center"}}>{strings('results.emptyMsg')}</Text>
                </Body>
                </CardItem>
            </Card>
            </Content>
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
  }
});
