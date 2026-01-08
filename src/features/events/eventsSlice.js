import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSessionEvents = createAsyncThunk(
  'events/getSessionEvents',
  async (sessionId) => {
    const response = await fetch(`/api/events/session/${sessionId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    const events = data.data;
    if (events.length === 0) {
      throw new Error('No events found for this session');
    }

    const sortedEvents = events.sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    );

    const startTime = sortedEvents[0].timestamp;
    const endTime = sortedEvents[sortedEvents.length - 1].timestamp;
    const duration = Math.floor((new Date(endTime) - new Date(startTime)) / 1000);
    
    const pageViews = events.filter(e => e.event_type === 'page_view').length;
    const clicks = events.filter(e => e.event_type === 'click').length;
    
    const isActive = (new Date() - new Date(endTime)) < 1800000;

    return {
      session_id: sessionId,
      start_time: startTime,
      end_time: endTime,
      duration: duration,
      status: isActive ? 'Active' : 'Ended',
      total_events: events.length,
      page_views: pageViews,
      clicks: clicks,
      events: sortedEvents
    };
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    sessionDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEvents: (state) => {
      state.list = [];
      state.sessionDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSessionEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionDetails = action.payload;
        state.list = action.payload.events || [];
      })
      .addCase(getSessionEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;