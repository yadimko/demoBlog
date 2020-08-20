import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const logger = store => next => action => {
	const result = next(action);
	console.log(store.getState());
	return result
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;