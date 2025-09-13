import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favorites: [] },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        (car) => car.id === action.payload.id
      );
      if (!exists) state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (car) => car.id !== action.payload.id
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
