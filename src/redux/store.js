import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/slice.js";
import brandsReducer from "./brands/slice.js";
import filtersReducer from "./filters/slice.js";
import favoriteReducer from "./favorites/slice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedFavoritehReducer = persistReducer(
  {
    key: "favorites",
    storage,
    whitelist: ["favorites"],
  },
  favoriteReducer
);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
    filters: filtersReducer,
    favorites: persistedFavoritehReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
