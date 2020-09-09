import React from 'react';
import {
  ListItem,
  Text,
  Left,
  Right,
  Thumbnail,
  Button,
  Body,
  View,
} from 'native-base';
import {INews} from 'models/news.model';
import {StyleSheet} from 'react-native';
import TimeAgo from './time';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 0,
  },
});

export interface IListItemProps {
  item: INews;
  displayItem: (item: INews) => void;
}

const ListItems = (props: IListItemProps) => {
  const {item, displayItem} = props;
  const handleDisplay = () => displayItem(item);

  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{uri: item.urlToImage ? item.urlToImage : ''}}
        />
      </Left>
      <Body>
        <Text numberOfLines={2}>{item.title}</Text>
        <Text note numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.container}>
          <Text note>{item.source.name}</Text>
          <Text note>
            <TimeAgo time={item.publishedAt!} />
          </Text>
        </View>
      </Body>
      <Right>
        <Button onPress={handleDisplay}>
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
  );
};

export default ListItems;
