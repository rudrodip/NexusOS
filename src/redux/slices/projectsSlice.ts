import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { OctokitRepoSearchResponse } from "@/types/octokit";
import { Octokit } from "octokit";

type InitialState = {
  isLoading: boolean;
  isError: boolean;
  data: OctokitRepoSearchResponse | null
};

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  data: null,
};

export const fetchRepos = createAsyncThunk(
  "fetchRepos",
  async (query: string): Promise<OctokitRepoSearchResponse> => {
    const octokit = new Octokit()
    const trendingRepos = await octokit.request("GET /search/repositories", {
      q: query,
      sort: "stars",
    })
    return trendingRepos
  }
);

export const zenodoSlice = createSlice({
  name: "zenodoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export default zenodoSlice.reducer;
