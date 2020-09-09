import React from 'react';
import {Provider} from 'react-redux';

import initStore from '../config/store';
import setupAxiosInterceptors from '../config/axios.interceptor';
import {Alert} from 'react-native';
import Main from './main';

const store = initStore();
setupAxiosInterceptors(() => {
  Alert.alert('Could not authenticate! Invalis API KEY!!!');
});

export const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
