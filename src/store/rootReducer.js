import { combineReducers } from 'redux';
import articlesReducer from './getArticles/reducers';
import paginationReducer from './pagination/reducers';
import articleOnClickReducer from './articleOnClick/reducers';
import userSignControlReducer from './userSignControl/reducers';
import createArticleReducer from './createArticle/reducers';

const rootReducer = combineReducers({
  articlesReducer,
  paginationReducer,
  articleOnClickReducer,
  userSignControlReducer,
  createArticleReducer,
});

export default rootReducer;
