import React from 'react';
import { ImageBackground,Image , View, Linking} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right ,} from 'native-base';

export default class VideoCard extends React.Component {
  render() {
    return (
        <Container style={{height:"100%"}}>
            <Content>
            <Card>
                <CardItem>
                <Icon type="MaterialIcons" name="video-library" style={{right: 0}}/>
                <Body style={{padding: 5}}>
                    <Text>שם הסירטון: </Text>
                    <Text note>סרטון</Text>
                </Body>
                {this.props.video.url ?
                <Button transparent onPress={() => this.props.navigation('Details', {video: this.props.video})}>
                       <Icon active name="md-information-circle"/>
                </Button>
                :
                null
                }
                </CardItem>
                {this.props.video.url ?
                <CardItem button cardBody onPress={() => Linking.openURL(this.props.video.url)}>
                    <ImageBackground source={{uri: this.props.video.url.replace(".mp4", ".jpg")}} style={{height: 200, width: null, flex: 1,}}/>
                    <Icon type="FontAwesome" name="play-circle" style={{position: "absolute", left: 150, color:"white", fontSize:50, width: 50}}/>
                </CardItem>
                :
                null
                }
                <CardItem>
                <Left>
                    <Button transparent danger onPress={() => this.props.removeVideo("this.props.video")}>
                        <Icon name="trash"/>
                        <Text>מחק סירטון</Text>
                    </Button>
                </Left>
                    { this.props.video.url ?
                    <Right style={{flexDirection:"row"}}>
                        <Icon name="md-cloud-done" style={{color:'green'}}/>
                        <Text style={{color: "green", left: 5}}>סרטון בשרת</Text>
                    </Right>
                    :
                    <Right>
                        <Button transparent warning onPress={() => this.props.navigation('Details', {video: this.props.video})}>
                            <Icon name="md-cloud-upload"/>
                            <Text>העלה לשרת</Text>
                        </Button>
                    </Right>
                    }
                </CardItem>
            </Card>
            </Content>
        </Container>
    );
  }
}