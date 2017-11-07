import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// import {createLogger} from 'redux-logger';
// const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  // loggerMiddleware
)(createStore);

export default function configureStore(initialState,devToolsExtension){
  const store = createStoreWithMiddleware(rootReducer,initialState,devToolsExtension);

  if(module.hot){
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    });
  }

  return store;
}
