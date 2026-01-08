import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHeatmap } from "./heatmapAPI";

export const getHeatmap = createAsyncThunk(
  "heatmap/get",
  fetchHeatmap
);

const heatmapSlice = createSlice({
  name: "heatmap",
  initialState: { points: [] },
  extraReducers: (builder) => {
    builder.addCase(getHeatmap.fulfilled, (state, action) => {
      state.points = action.payload;
    });
  }
});

export default heatmapSlice.reducer;
