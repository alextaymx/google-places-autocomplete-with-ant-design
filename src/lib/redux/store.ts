import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import searchReducer from '@/lib/redux/slices/searchSlice';

export function makeStore() {
  return configureStore({
    reducer: { search: searchReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
