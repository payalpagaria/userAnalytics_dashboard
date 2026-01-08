import { configureStore } from "@reduxjs/toolkit";
import sessionsReducer from "../features/sessions/sessionsSlice";
import eventsReducer from "../features/events/eventsSlice";
import heatmapReducer from "../features/heatmap/heatmapSlice";

export const store = configureStore({
  reducer: {
    sessions: sessionsReducer,
    events: eventsReducer,
    heatmap: heatmapReducer
  }
});
