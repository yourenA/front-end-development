/**
 * Created by Administrator on 2017/4/14.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './../reducers/index';

const configureStore = preloadedState => {
    //createStore(rootReducer,preloadedState,applyMiddleware) 创建store
    return createStore (
        rootReducer,
        preloadedState,
        compose (
            applyMiddleware(thunk,createLogger())
        )
    );
}

const store = configureStore();

export default store;