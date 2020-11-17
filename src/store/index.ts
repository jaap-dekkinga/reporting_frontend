import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
//import { initialState } from '../common/consts';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

export default () => {
    return createStore(rootReducer, applyMiddleware(...middlewares)) //initialState, 
}