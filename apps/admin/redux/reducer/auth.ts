import TYPE from '../types/types'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
    userType: null,
    isAuthenticated: false,
    userDetails: null
}

const admin = (state = initialState, action: any) => {
    switch (action.type) {
        case HYDRATE:
            return {
              ...state,
              ...action.payload.admin,
            }

        case TYPE.LOGIN_USER:
            return Object.assign({}, state, {
                userType: action.payload,
                isAuthenticated: true,
        })

        case TYPE.USER_DETAILS:
            return Object.assign({}, state, {
                userDetails: action.payload
            })

        case TYPE.LOGOUT_USER:
            return Object.assign({}, state, {
                userType: null,
                isAuthenticated: false,
                userDetails: null
        })

        case TYPE.SET_PERMISSION:
            return Object.assign({}, state, {
               permissions: action.payload
        })
    
        default:
            return state
    }
}

export default admin