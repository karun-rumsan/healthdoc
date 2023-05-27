import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/api.js";

export const reqPatitent = createAsyncThunk(
  "reqres/reqPatient",
  async (sendrequest, { rejectWithValue }) => {
    try {
      const response = await api.requsetForDoctor(sendrequest);
      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getrequest = createAsyncThunk(
  "reqres/getrequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getRequest();
      const parsing = JSON.stringify(response);
      return JSON.parse(parsing);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const reqresSlice = createSlice({
  name: "reqres",
  initialState: {
    isLoading: false,
    error: "",
    data: "",
  },
  reducer: {},
  extraReducers: {
    [reqPatitent.pending]: (state) => {
      state.isLoading = true;
    },
    [reqPatitent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [reqPatitent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [getrequest.pending]: (state) => {
      state.isLoading = true;
    },
    [getrequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [getrequest.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.data;
    },
  },
});

// export const {}

export default reqresSlice.reducer;
