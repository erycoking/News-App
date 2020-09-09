import {combineReducers} from 'redux';
import news, {NewsState} from '../components/news.reducer';

export interface IRootState {
  readonly news: NewsState;
}
const rootReducer = combineReducers<IRootState>({
  news,
});

export default rootReducer;
