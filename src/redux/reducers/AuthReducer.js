const SET_USER = 'set_user';

const AuthInitialState = {
  user: ''
}

export const setUser = (user) => ({
  type: SET_USER,
  user
})

export const AuthReducer = (state = AuthInitialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}
