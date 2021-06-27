import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
//import { initialState } from '../common/consts';

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(...middlewares)); //initialState,
};

const store = configureStore();

export default store;
