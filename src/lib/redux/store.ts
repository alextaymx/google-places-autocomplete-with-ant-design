import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { debounce } from 'lodash';

import { loadState, saveState } from '@/lib/local-storage/localStorage';
import searchReducer from '@/lib/redux/slices/searchSlice';

export function makeStore() {
  return configureStore({
    reducer: { search: searchReducer },
    // here we restore the previously persisted state
    preloadedState: loadState(),
  });
}

const store = makeStore();
store.subscribe(() => {
  saveState(store.getState());

  debounce(() => {
    console.log('saving state', store.getState());
    saveState(store.getState());
  }, 1000);
});
export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
