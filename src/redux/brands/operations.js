import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchBrands = createAsyncThunk(
  "brands/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/brands");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
