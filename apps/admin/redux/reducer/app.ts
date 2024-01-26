import TYPE from '../types/types'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
    isMobile: null,
    themeDataFromStore: {},
    isRefreshApi: false,
    preferanceData: {},
    adminConfig: null
}

const app = (state = initialState, action: any) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload.app,
            }

        case TYPE.UPDATE_DEVICE_TYPE:
            return Object.assign({}, state, {
                isMobile: action.payload
            })
        case TYPE.THEME_DATA:
            return {
                ...state,
                themeDataFromStore: action.payload,
            }
        case TYPE.REFRESH_API:
            return {
                ...state,
                isRefreshApi: action.payload,
            }
        case TYPE.PREFERANCE_DATA:
            return {
                ...state,
                preferanceData: action.payload,
            }
        case TYPE.ADMIN_CONFIG:
            return {
                ...state,
                adminConfig: action.payload,
            }
        default:
            return state
    }
}

export default app
