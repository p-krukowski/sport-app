export const chosenLeagueReducer = (state = {
  chosenLeague: null
}, action) => {
  switch (action.type) {
    case "RESULTS_SET_CHOSEN_LEAGUE":
      state = {
        ...state,
        chosenLeague: action.payload
      };
      break;
  }
  return state;
};