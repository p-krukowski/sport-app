export const authReducer = (state = {
  currentUser: null,
  isAuthenticated: false
}, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      state = {
        ...state,
        currentUser: action.payload
      };
      break;
    case "SET_IS_AUTHENTICATED":
      state = {
        ...state,
        isAuthenticated: action.payload
      };
      break;
    default:
      break;
  }
  return state;
};