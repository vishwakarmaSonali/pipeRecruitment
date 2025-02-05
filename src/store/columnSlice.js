import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected:[
    "Candidate Name",
    "Candidate First Name",
    "Candidate Last Name",
    "Reference Id",
    "Location",
    "Gender",
    "Diploma",
    "University",
    "Current Company",
    "Current Position",
    "Email",
    "Birthdate",
    "Candidate Address",
    "Employment Status",
    "Contact Number",
    "Hired Date",
    "Start Date",
    "ATS score",
    "Created Date",
    "Created By",
  ],
};

const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { setColumns } = columnSlice.actions;
export default columnSlice.reducer;
