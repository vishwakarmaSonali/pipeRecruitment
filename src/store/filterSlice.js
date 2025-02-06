import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action for saving filters
export const saveFilterAsync = createAsyncThunk("filters/saveFilter", async (filter, { rejectWithValue }) => {
  try {
    return new Promise((resolve) => setTimeout(() => resolve(filter), 500));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async action for updating filters
export const updateFilterAsync = createAsyncThunk("filters/updateFilter", async ({ name, conditions }, { getState, rejectWithValue }) => {
  try {
    const state = getState().filters.filters;
    const updatedFilters = state.map(filter =>
      filter.name === name ? { ...filter, conditions } : filter
    );
    return updatedFilters;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filters: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteFilter: (state, action) => {
      state.filters = state.filters.filter((filter) => filter.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFilterAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveFilterAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.filters.push(action.payload);
      })
      .addCase(saveFilterAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFilterAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFilterAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.filters = action.payload;
      })
      .addCase(updateFilterAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteFilter } = filterSlice.actions;
export default filterSlice.reducer;