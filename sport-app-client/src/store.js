import {combineReducers, createStore} from "redux";
import {resultsReducer} from "./reducers/resultsReducers";
import {authReducer} from "./reducers/authReducers";
import {modalsReducer} from "./reducers/modalsReducer";

export const store = createStore(combineReducers({
  results: resultsReducer,
  auth: authReducer,
  modals: modalsReducer
}));