import TYPES from '../types/types'
import API from '../../api/customer/UserService'

const storeUserData = (value: any) => {
  return {
    type: TYPES.USER_DETAILS,
    payload: value,
  }
}

const getUserDetails = () => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      API.getUserProfile()
        .then((response: any) => {
          if (response?.data?.data) {
            dispatch(storeUserData(response?.data?.data))
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  storeUserData,
  getUserDetails,
}
