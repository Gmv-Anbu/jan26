import TYPES from '../types/types'

export const loginSuccess = ({ user }) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: {
    user,
  },
})

export default loginSuccess
