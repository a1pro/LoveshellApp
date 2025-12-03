import { configureStore } from '@reduxjs/toolkit';
import childReducer from '../slice/childSlice';
import favouritesReducer from '../slice/favoritesSlice';
const store = configureStore({
  reducer: {
    child: childReducer,
    favorites:favouritesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
