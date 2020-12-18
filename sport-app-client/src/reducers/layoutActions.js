export const layoutReducer = (state = {
  height: 0
}, action) => {
  switch (action.type) {
    case "LAYOUT_SET_NAVBAR_HEIGHT":
      state = {
        ...state,
        navBarHeight: action.payload
      };
      break;
  }
  return state;
};