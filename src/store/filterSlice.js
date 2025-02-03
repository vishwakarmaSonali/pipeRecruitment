import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to save filters
export const saveFilterAsync = createAsyncThunk(
  "filters/saveFilterAsync",
  async (filter, { rejectWithValue }) => {
    try {
      // Simulate an API call (replace with actual API request if needed)
      await new Promise((resolve) => setTimeout(resolve, 500));
      return filter; // Return the filter object
    } catch (error) {
      return rejectWithValue("Failed to save filter");
    }
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    savedFilters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveFilterAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveFilterAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.savedFilters.push(action.payload);
      })
      .addCase(saveFilterAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default filterSlice.reducer;
