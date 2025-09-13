import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, filters = {}, limit = 12 } = {}, thunkAPI) => {
    try {
      const queryParams = {};

      if (filters.minMileage != null)
        queryParams.minMileage = filters.minMileage;
      if (filters.maxMileage != null)
        queryParams.maxMileage = filters.maxMileage;
      if (filters.brand) queryParams.brand = filters.brand;
      if (filters.price != null) queryParams.rentalPrice = filters.price;

      const response = await axios.get("/cars", {
        params: { page, limit, ...queryParams },
      });

      return {
        cars: response.data.cars,
        totalCars: response.data.totalCars,
        page: Number(response.data.page),
        totalPages: Number(response.data.totalPages),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
