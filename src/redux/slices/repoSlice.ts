import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "octokit";
import { Repository } from "@/types/github-types";

type repoData = {
  repo: Repository,
  readme: string
}

type InitialState = {
  isLoading: boolean;
  isError: boolean;
  repoData: repoData | null;
};

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  repoData: null,
};

export const fetchRepo = createAsyncThunk(
  "fetchRepo",
  async ({ owner, repo }: { owner: string, repo: string }) => {
    const octokit = new Octokit();
    const repoRes = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });
  
    const readme = await octokit.request("GET /repos/{owner}/{repo}/readme", {
      owner: owner,
      repo: repo,
    })
    const readmeContent: string | null = atob(readme.data.content)
    
    const repoData: Repository | null = {
      url: repoRes.data.html_url,
      name: repoRes.data.name,
      description: repoRes.data.description,
      stargazerCount: repoRes.data.stargazers_count,
      primaryLanguage: {
        name: repoRes.data.language || ""
      }
    }

    return { repo: repoData, readme: readmeContent };
  }
);

export const repoSlice = createSlice({
  name: "repoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.repoData = action.payload;
      })
      .addCase(fetchRepo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.error)
      });
  },
});

export default repoSlice.reducer;
