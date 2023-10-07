import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Hit } from "@/types/zenodo";
import { env } from "@env.mjs";

type InitialState = {
  isLoading: boolean;
  isError: boolean;
  record: Hit | null;
};

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  record: null,
};

export const fetchRecord = createAsyncThunk(
  "fetchRecord",
  async (id: number) => {
    const url = `${env.NEXT_PUBLIC_ZENODO_API_BASE_URL}/records/${id}`
    const res = await fetch(url);
    const data = await res.json();

    return data as Hit;
  }
);

export const recordSlice = createSlice({
  name: "recordSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.record = action.payload;
      })
      .addCase(fetchRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export default recordSlice.reducer;
