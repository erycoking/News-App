import React from 'react';
import {INews} from 'models/news.model';
import {Modal, Share, Dimensions, StyleSheet} from 'react-native';
import {
  Content,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Container,
} from 'native-base';
import {WebView} from 'react-native-webview';

const webViewHeight = Dimensions.get('window').height - 56;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
  container: {
    margin: 15,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  icon: {
    color: '#fff',
  },
});

export interface IModalProps {
  item: INews;
  showModal: boolean;
  handleClose: () => void;
}

const ModalComponent = (props: IModalProps) => {
  const {item, showModal} = props;

  const handleClose = () => props.handleClose();

  const handleShare = () => {
    const {url, title} = item;
    const message = `${title}\n\nRead More @${url}\n\nShared via Erycoking News`;
    return Share.share(
      {
        title,
        message,
        url: message,
      },
      {dialogTitle: `Share ${title}`},
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      onRequestClose={handleClose}>
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={handleClose}>
              <Icon name="close" style={styles.icon} />
            </Button>
          </Left>
          <Body>
            <Title>{item.title}</Title>
          </Body>
          <Right>
            <Button transparent onPress={handleShare}>
              <Icon name="share" style={styles.icon} />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{height: webViewHeight}}>
          <WebView
            source={{uri: item.url!}}
            style={styles.webView}
            onError={handleClose}
            startInLoadingState
            scalesPageToFit
          />
        </Content>
      </Container>
    </Modal>
  );
};

export default ModalComponent;
