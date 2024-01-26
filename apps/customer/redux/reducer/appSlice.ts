import MarketService from '@apps/customer/api/customer/MarketService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobile: null,
  themeData: null,
  status: 'idle',
  preferenceData: null,
  buyItems: null
};

const getFieldValue = (data, key) => {
  const field = data.find(
    (item: { preferanceKey: string }) => item.preferanceKey == key
  )
  if (field) {
    return field.preferanceValue
  }
  return ''
}

export const getThemeDetails = createAsyncThunk(
  'app/getUserTheme',
  async () => {
    const response: any = await MarketService.getUserTheme();
    if (response.status === 200)

      return response.data;

  }
);

export const getPreferenceDetails = createAsyncThunk(
  'app/getPreferenceData',
  async () => {
    const response: any = await MarketService.getPreferances();
    let preferencValues = {}
    if (response.status === 200) {
      const data = response?.data?.data?.preferances?.rows;
      preferencValues = {
        meta_title: getFieldValue(data, "meta_title"),
        meta_description: getFieldValue(data, "meta_description"),
        google_analytics: getFieldValue(data, "google_analytics"),
      }
    }
    return preferencValues;
  }
);


export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateDeviceType: (state, action) => {
      state.isMobile = action?.payload
    },
    addItemToRedux: (state, action) => {
      state.buyItems = action?.payload
    },
  },
  extraReducers: (builder) => {
    builder

      /****to handle theme api */
      .addCase(getThemeDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getThemeDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.themeData = action.payload?.data;
      })
      .addCase(getThemeDetails.rejected, (state, action) => {
        state.status = 'rejected';
        state.themeData = {};
      })
      .addCase(getPreferenceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPreferenceDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.preferenceData = action.payload;
      })
      .addCase(getPreferenceDetails.rejected, (state, action) => {
        state.status = 'rejected';
        state.preferenceData = null;
      })

    /******/
  },

});

export const { updateDeviceType, addItemToRedux } = appSlice.actions;
export default appSlice.reducer;
