import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const logger = (store) => (next) => (action) => {
  const result = next(action);
  console.log(store.getState());
  return result;
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
  logger,
  thunk
)));

export default store;
