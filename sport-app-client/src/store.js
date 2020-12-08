import {createStore} from "redux";
import {chosenLeagueReducer} from "./reducers/resultsReducers";

export const store = createStore(chosenLeagueReducer);