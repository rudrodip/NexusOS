import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ZenodoData, ZenodoQueryParams } from "@/types/zenodo";
import { env } from "@env.mjs";

type InitialState = {
  isLoading: boolean;
  isError: boolean;
  data: ZenodoData;
};

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  data: {
    hits: {
      hits: [],
      total: 0
    },
  },
};

export const fetchRecords = createAsyncThunk(
  "fetchRecords",
  async (queryParams: ZenodoQueryParams) => {
    const queryParamsString = Object.entries(queryParams)
      .filter(([_, value]) => value !== undefined) // Remove undefined values
      .map(([key, value]) => `${key}=${String(value)}`) // Convert all values to strings
      .join("&");
    const url = `${env.NEXT_PUBLIC_ZENODO_API_BASE_URL}/records?${queryParamsString}`
    const res = await fetch(url);
    const data = await res.json();

    return data as ZenodoData;
  }
);

export const zenodoSlice = createSlice({
  name: "zenodoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export default zenodoSlice.reducer;
