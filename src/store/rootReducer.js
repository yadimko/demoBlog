import { combineReducers } from 'redux';
import articlesReducer from './getArticles/reducers';
import paginationReducer from './pagination/reducers';
import articleOnClickReducer from './getArticleOnClick/reducers';
import userSignControlReducer from './userSignControl/reducers';

const rootReducer = combineReducers({
  articlesReducer,
  paginationReducer,
  articleOnClickReducer,
  userSignControlReducer
});

export default rootReducer;
