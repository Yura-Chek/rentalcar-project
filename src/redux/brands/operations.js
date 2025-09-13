import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

// Всі авто
export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/brands");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
