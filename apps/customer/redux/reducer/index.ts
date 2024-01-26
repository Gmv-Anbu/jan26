import { combineReducers } from '@reduxjs/toolkit'

import appReducer from './appSlice'
import authSlice from './authSlice'
import userSlice from './userSlice'
import magicSlice from './magicSlice'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authSlice,
  userData: userSlice,
  magicData: magicSlice,
})

export default rootReducer
