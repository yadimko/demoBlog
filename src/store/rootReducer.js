import {combineReducers} from 'redux';
import articlesReducer from './getArticles/reducers';
import paginationReducer from './pagination/reducers';
import articleOnClickReducer from './getArticleOnClick/reducers';

const rootReducer = combineReducers({
	articlesReducer,
	paginationReducer,
	articleOnClickReducer
})

export default rootReducer;