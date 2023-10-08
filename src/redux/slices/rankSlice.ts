import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

type FormData = {
  domain: string,
  language: string,
  desc: string
}

type InitialState = {
  isLoading: boolean,
  isError: boolean,
  users: User[] | null;
  formData: FormData | null;
}

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  users: null,
  formData: null,
};

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async ({ domain, language }: { domain: string, language: string }): Promise<User[]> => {
    const res = await fetch('/api/rank', {
      method: 'POST',
      body: JSON.stringify({
        domain: domain,
        language: language
      })
    })
    const json = await res.json()
    return json;
  }
);

export const rankSlice = createSlice({
  name: "rankSlice",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setFormData } = rankSlice.actions;
export default rankSlice.reducer;