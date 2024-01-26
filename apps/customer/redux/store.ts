import { Action, AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { getItem, KEYS } from '../utils/storage';

import rootReducer from './reducer';


let reducer = {} 
reducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if(nextState) return nextState;
      // if(!nextState) return {};
    } else {
      return rootReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer:reducer });
  
type Store = ReturnType<typeof makeStore>;
/***Use this store if only we have necessity outside of react component */
export let injectedStore:Store;
export const makeInjectedStore = _store => {
  injectedStore = _store
}
/****** */

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });