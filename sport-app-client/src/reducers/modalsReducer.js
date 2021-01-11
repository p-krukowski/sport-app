export const modalsReducer = (state = {
  showNewNewsModal: false
}, action) => {
  switch (action.type) {
    case "MODALS_SET_SHOW_NEW_NEWS_MODAL":
      state = {
        ...state,
        showNewNewsModal: action.payload
      };
      break;
  }
  return state;
};