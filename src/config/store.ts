import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import {IRootState} from '../reducers';
import {createStore, compose, applyMiddleware} from 'redux';
import reducers from '../reducers';

const defaultMiddlewares = [thunkMiddleware, promiseMiddleware];

const composedMiddlewares = (middleware: any) =>
  compose(applyMiddleware(...defaultMiddlewares, ...middleware));

const initialize = (initialState?: IRootState, middleware = []) =>
  createStore(reducers, initialState, composedMiddlewares(middleware));

export default initialize;
