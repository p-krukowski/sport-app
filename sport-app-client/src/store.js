import {combineReducers, createStore} from "redux";
import {resultsReducer} from "./reducers/resultsReducers";
import {authReducer} from "./reducers/authReducers";

export const store = createStore(combineReducers({
  results: resultsReducer,
  auth: authReducer
}));