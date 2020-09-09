import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {Content, List, Text} from 'native-base';
import {IRootState} from '../reducers';
import {getEntities} from './news.reducer';
import ListItems from './listItem.component';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import ModalComponent from './model';
import {INews} from 'models/news.model';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: 10,
  },
});

export interface ITab2Props extends StateProps, DispatchProps {}

const Tab2 = (props: ITab2Props) => {
  const {getEntities} = props;
  const [news, setNews] = useState<any[]>([]);
  const [item, setItem] = useState<INews>({});
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (displayItem: INews) => {
    setItem(displayItem);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setItem({});
    setShowModal(false);
  };

  useEffect(() => {
    if (props.news.length > 0) {
      setNews(() => {
        return [...props.news];
      });
    }
  }, [props.news]);

  useEffect(() => {
    getEntities('technology');
  }, [getEntities]);

  return (
    <>
      <Content padder>
        {props.loading ? (
          <View>
            <ActivityIndicator animating={props.loading} />
            <Text style={styles.message}>Loading...</Text>
          </View>
        ) : (
          <List
            dataArray={news}
            renderRow={(item) => (
              <ListItems displayItem={handleShowModal} item={item} />
            )}
            keyExtractor={() => Math.random().toString()}
          />
        )}
      </Content>
      <ModalComponent
        item={item}
        handleClose={handleCloseModal}
        showModal={showModal}
      />
    </>
  );
};

const mapStateToProps = ({news}: IRootState) => ({
  news: news.entities,
  loading: news.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tab2);
