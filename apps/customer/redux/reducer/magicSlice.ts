import MarketService from '@apps/customer/api/customer/MarketService'

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  magicLoader: false,
}

export const magicLoaderSlice = createSlice({
  name: 'magicLoader',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMagicLoader: (state, action) => {
      state.magicLoader = action?.payload
    }
  },
})

export const { setMagicLoader } = magicLoaderSlice.actions
export default magicLoaderSlice.reducer
