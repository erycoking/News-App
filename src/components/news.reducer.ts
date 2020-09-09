import {REQUEST, FAILURE, SUCCESS} from '../reducers/action-type.util';
import Axios, {AxiosPromise} from 'axios';
import {country} from '../config/constants';
import {INews, defaultValue} from 'models/news.model';

export const ACTION_TYPES = {
  FETCH_NEWS_LIST: 'news/FETCH_NEWS_LIST',
  FETCH_NEWS: 'news/FETCH_NEWS',
  CREATE_NEWS: 'news/CREATE_NEWS',
  UPDATE_NEWS: 'news/UPDATE_NEWS',
  DELETE_NEWS: 'news/DELETE_NEWS',
  RESET: 'news/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  entities: [] as ReadonlyArray<INews>,
  entity: defaultValue,
  updateSuccess: false,
  totalItems: 0,
};

export type NewsState = Readonly<typeof initialState>;

export default (state: NewsState = initialState, action: any): NewsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NEWS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NEWS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_NEWS):
    case REQUEST(ACTION_TYPES.UPDATE_NEWS):
    case REQUEST(ACTION_TYPES.DELETE_NEWS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_NEWS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NEWS):
    case FAILURE(ACTION_TYPES.CREATE_NEWS):
    case FAILURE(ACTION_TYPES.UPDATE_NEWS):
    case FAILURE(ACTION_TYPES.DELETE_NEWS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEWS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data.articles,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_NEWS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_NEWS):
    case SUCCESS(ACTION_TYPES.UPDATE_NEWS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_NEWS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}

export type ICrudGetAllAction<T> = (
  category: string,
) => IPayload<T> | ((dispatch: any) => IPayload<T>);

const apiUrl = 'v2/top-headlines';
export const getEntities: ICrudGetAllAction<INews> = (category) => {
  const request: string = `${apiUrl}?country=${country}&category=${category}`;
  return {
    type: ACTION_TYPES.FETCH_NEWS_LIST,
    payload: Axios.get<INews>(request),
  };
};
