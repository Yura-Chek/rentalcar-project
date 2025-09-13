import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    totalCars: 0,
    page: 1,
    totalPages: 0,
    isLoadingInitial: true,
    isLoadingMore: false,
    error: null,
  },
  reducers: {
    setLoadingInitial: (state, action) => {
      state.isLoadingInitial = action.payload;
    },
    setLoadingMore: (state, action) => {
      state.isLoadingMore = action.payload;
    },
    clearCars: (state) => {
      state.cars = [];
      state.totalCars = 0;
      state.page = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        const page = action.meta.arg?.page || 1;

        if (page === 1) {
          state.isLoadingInitial = true;
          state.cars = [];
        } else {
          state.isLoadingMore = true;
        }
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.cars = action.payload.cars;
        } else {
          state.cars = [...state.cars, ...action.payload.cars];
          state.isLoadingMore = false;
        }
        state.totalCars = action.payload.totalCars;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.isLoadingInitial = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoadingInitial = false;
        state.isLoadingMore = false;
        state.error = action.payload;
      });
  },
});

export const { setLoadingInitial, setLoadingMore, clearCars } =
  carsSlice.actions;
export default carsSlice.reducer;
