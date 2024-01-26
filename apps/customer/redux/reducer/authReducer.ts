import { loginSuccess } from '../actions/auth'

const initialState = {
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginSuccess:
      return {
        ...state,
        user: action.payload.user,
      }
    default:
      return state
  }
}

export default authReducer
