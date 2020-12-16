export const setIsAuthenticated = (isAuthenticated) => {
  return {
    type: "SET_IS_AUTHENTICATED",
    payload: isAuthenticated
  }
}

export const setCurrentUser = (currentUser) => {
  return {
    type: "SET_CURRENT_USER",
    payload: currentUser
  }
}
