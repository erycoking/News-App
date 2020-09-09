import React from 'react';
import {connect} from 'react-redux';
import {
  Container,
  Header,
  Root,
  Tabs,
  Tab,
  Left,
  Right,
  Body,
  Title,
} from 'native-base';
import Tab1 from './tab1.component';
import Tab2 from './tab2.component';
import Tab3 from './tab3.component';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface IMainProps {}

const Main = () => {
  return (
    <Root>
      <Container>
        <Header hasTabs>
          <Left />
          <Body style={styles.container}>
            <Title>News App</Title>
          </Body>
          <Right />
        </Header>
        <Tabs>
          <Tab heading="General">
            <Tab1 />
          </Tab>
          <Tab heading="Technology">
            <Tab2 />
          </Tab>
          <Tab heading="Business">
            <Tab3 />
          </Tab>
        </Tabs>
      </Container>
    </Root>
  );
};

export default connect(null, null)(Main);
