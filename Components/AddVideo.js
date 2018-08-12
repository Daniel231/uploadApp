import React from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right ,} from 'native-base';
import ImagePicker from 'react-native-image-picker'

export default class AddVideo extends React.Component {
    selectVideoTapped() {
        const options = {
          title: 'בחירת וידיאו',
          takePhotoButtonTitle: 'צלם מהמצלמה',
          chooseFromLibraryButtonTitle:'בחר מגלריה',
          cancelButtonTitle:'ביטול',
          mediaType: 'video',
          videoQuality: 'medium'
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
      
          if (response.didCancel) {
            console.log('User cancelled video picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            this.props.addVideo(response.uri)
          }
        });
      }
  render() {
    return (
        <Container style={{height:"100%"}}>
            <Content >
            <Card>
                <CardItem>
                <Body>
                <Button transparent style={{height:200, width: 325,}} onPress ={() => this.selectVideoTapped()}>
                    <Icon name="md-add-circle" style={{left: 75,fontSize: 200}}/>
                </Button>
                </Body>
                </CardItem>
            </Card>
            </Content>
        </Container>
    );
  }
}