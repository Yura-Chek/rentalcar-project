import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, filters = {}, limit = 12 } = {}, thunkAPI) => {
    try {
      const params = {};
      if (filters.brand) params.brand = filters.brand;
      if (filters.price != null) params.rentalPrice = filters.price;
      if (filters.minMileage != null) params.minMileage = filters.minMileage;
      if (filters.maxMileage != null) params.maxMileage = filters.maxMileage;

      const res = await axios.get("/cars", {
        params: { page, limit, ...params },
      });

      return {
        cars: res.data.cars,
        totalCars: res.data.totalCars,
        page: Number(res.data.page),
        totalPages: Number(res.data.totalPages),
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
