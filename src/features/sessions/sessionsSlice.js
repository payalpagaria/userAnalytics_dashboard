import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSessions } from "./sessionsAPI";

export const getSessions = createAsyncThunk(
  "sessions/get",
  async () => {
    return await fetchSessions();
  }
);

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: {
    list: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSessions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getSessions.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default sessionsSlice.reducer;
