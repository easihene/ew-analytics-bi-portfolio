import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDashboards = createAsyncThunk(
  'dashboards/fetchDashboards',
  async () => {
    const response = await axios.get('/DashboardImages.json');
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboards',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    selectedId: null,
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        if (action.payload.length > 0 && state.selectedId === null) {
          state.selectedId = action.payload[0].ID;
        }
      })
      .addCase(fetchDashboards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedId } = dashboardSlice.actions;

export default dashboardSlice.reducer;