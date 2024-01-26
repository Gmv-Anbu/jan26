import { combineReducers } from '@reduxjs/toolkit';

import appReducer from './app'
import authReducer from './auth'

const rootReducer = combineReducers({
    app : appReducer,
    userData: authReducer,
});

export default rootReducer
