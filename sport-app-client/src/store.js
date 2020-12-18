import {combineReducers, createStore} from "redux";
import {resultsReducer} from "./reducers/resultsReducers";
import {authReducer} from "./reducers/authReducers";
import {layoutReducer} from "./reducers/layoutActions";

export const store = createStore(combineReducers({
  results: resultsReducer,
  auth: authReducer,
  layout: layoutReducer
}));