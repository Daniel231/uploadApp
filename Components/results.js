import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'; // 0.18.0
import { Container, Content, Textarea,Header, Form, Label,Right,Input, Card, CardItem, Body, Button, Icon} from "native-base";


export default class Videos extends React.Component {
  state = { fileds: [],isLoaded: false};

  getFileds() {
    this.setState({ fileds: [{filed: "שדה 1", grade: 100},{filed: "שדה 2", grade: 92},{filed: "שדה 3", grade: 40},{filed: "שדה 4", grade: 85},{filed: "שדה 5", grade: 22}], isLoaded: true});
  }

   componentDidMount() {
    this.getFileds()
  }
  render() {
    let {fileds} = this.state

    return (
      <Container>
        <Header>
          <Icon name="menu" onPress={() => this.props.navigation.toggleDrawer()} style={{color:"white", top:15, left: 15}}/>
          <Body style={{left: 30}}>
            <Text style={{color: "white", fontSize:20}}>תוצאות</Text>
          </Body>
        </Header>
            <Content >
            <Card>
                <CardItem>
                <Body>
                {
                  this.state.isLoaded &&
                  <View style={styles.fileds}>
                    {fileds.map((item,i) =>
                  <Text key ={i}>{item.filed} : {item.grade}</Text>)}
                  </View>
                }
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
