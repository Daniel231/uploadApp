import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right ,} from 'native-base';

export default class VideoCard extends React.Component {
  render() {
    return (
        <Container style={{padding: 0}}>
            <Content>
            <Card>
                <CardItem>
                <Left >
                <Button transparent >
                    <Icon style={{left: 5}} name="md-more"/>
                </Button>
                </Left>
                <Body>
                    <Text>שם הסירטון: </Text>
                    <Text note>{this.props.video.format}</Text>
                </Body>
                <Icon type="MaterialIcons" name="video-library"/>
                </CardItem>
                <CardItem cardBody>
                <Image source={{uri: "https://placeimg.com/140/50/any"}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                <Left>
                    <Icon name="md-cloud-done" style={{color:'green'}}/>
                    <Text style={{color: "green", left: 7}}>סרטון בשרת</Text>
                </Left>
                <Right>
                    <Button transparent danger>
                        <Icon name="trash"/>
                        <Text>מחק סירטון</Text>
                    </Button>
                </Right>
                </CardItem>
            </Card>
            </Content>
        </Container>
    );
  }
}