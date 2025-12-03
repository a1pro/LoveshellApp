import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoritesMap: { [mealId: number]: boolean };
}

const initialState: FavoritesState = {
  favoritesMap: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      state.favoritesMap[action.payload] = true;
    },
    removeFavorite(state, action: PayloadAction<number>) {
      delete state.favoritesMap[action.payload];
    },
    setFavorites(state, action: PayloadAction<{ [key: number]: boolean }>) {
      state.favoritesMap = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
