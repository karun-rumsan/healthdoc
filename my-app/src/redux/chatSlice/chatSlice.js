import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/api.js";

export const getChatById = createAsyncThunk(
  "chatSlice/getChatByID",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getmessageById(id);
      console.log(response);
      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postChatByID = createAsyncThunk(
  "chatSlice/postChatById",
  async (arg, { rejectWithValue }) => {
    // const { id, message } = arg;
    try {
      const contoller = new AbortController();
      const signal = contoller.signal;
      const response = await api.postChatMessageByID(arg, {
        signal,
      });
      contoller.abort();
      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteChatById = createAsyncThunk(
  "chatSlice/deletebyid",
  async (id, { rejectWithValue }) => {
    try {
      const contoller = new AbortController();
      const signal = contoller.signal;
      const response = await api.deleteChatId(id, { signal });
      contoller.abort();
      return JSON.parse(JSON.stringify(response));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    isLoading: false,
    err: "",
    data: [],
  },
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getChatById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChatById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.is = action;
      state.data = action.payload.data;
      state.err = "";
    });
    builder.addCase(getChatById.rejected, (state, action) => {
      state.err = action.error.message;
    });

    builder.addCase(postChatByID.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postChatByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload.data];
      state.datak = action;
      state.err = "";
    });
    builder.addCase(postChatByID.rejected, (state, action) => {
      state.err = action.error.message;
    });
    builder.addCase(deleteChatById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteChatById.fulfilled, (state, action) => {
      state.isLoading = false;
      const { arg } = action.meta;
      if (arg) {
        state.data = state.data.filter((a) => a.id !== arg);
      }
    });
    builder.addCase(deleteChatById.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.error.message;
    });
  },
});

export default chatSlice.reducer;
