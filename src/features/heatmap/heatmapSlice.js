import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHeatmapPages, fetchHeatmapPoints } from "./heatmapAPI";

// Fetch all pages with click stats
export const getHeatmapPages = createAsyncThunk(
  "heatmap/getPages",
  async () => {
    const response = await fetchHeatmapPages();
    return response.data;
  }
);

// Fetch heatmap points for a specific page
export const getHeatmapPoints = createAsyncThunk(
  "heatmap/getPoints",
  async (pageUrl) => {
    const response = await fetchHeatmapPoints(pageUrl);
    return response.data || response;
  }
);

const heatmapSlice = createSlice({
  name: "heatmap",
  initialState: {
    pages: [],
    points: [],
    selectedPage: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pages
      .addCase(getHeatmapPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHeatmapPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
        // Auto-select first page if none selected
        if (!state.selectedPage && action.payload.length > 0) {
          state.selectedPage = action.payload[0];
        }
      })
      .addCase(getHeatmapPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Points
      .addCase(getHeatmapPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHeatmapPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload;
      })
      .addCase(getHeatmapPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedPage } = heatmapSlice.actions;
export default heatmapSlice.reducer;
