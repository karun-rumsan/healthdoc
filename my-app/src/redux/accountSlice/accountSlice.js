import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/api";

export const regAccount = createAsyncThunk(
  "account/register",
  async ({ reg }, { rejectWithValue }) => {
    try {
      const data = await api.signUp(reg);
      window.location.reload(false);
      await api.exist();
      return data;
    } catch (e) {
      return rejectWithValue(e.data.data);
    }
  }
);

export const loginAccount = createAsyncThunk(
  "account/login",
  async ({ login, navigate }, { rejectWithValue }) => {
    try {
      const data = await api.signIn(login);
      navigate("/dashboard");
      return data.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const myAccount = createAsyncThunk(
  "account/me",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.whoami();
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getForUser = createAsyncThunk(
  "account/getForUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getForUser();
      const ls = JSON.stringify(response);
      return JSON.parse(ls);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");
  if (isAuth && JSON.parse(isAuth)) {
    return true;
  }
  return false;
};

const userDataFromLocalStorage = () => {
  const data = localStorage.getItem("data");
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

const accountSlice = createSlice({
  name: "account",
  initialState: {
    isAuth: userAuthFromLocalStorage(),
    user: userDataFromLocalStorage(),
    error: "",
    loading: false,
    doc: "",
  },
  reducers: {
    authenticatedUser: (state) => {
      state.isAuth = true;
    },
    unauthenticatedUser: (state) => {
      localStorage.removeItem("isAuth");
      localStorage.removeItem("data");
      state.isAuth = false;
      state.user = null;
      state.data = "";
    },
  },
  extraReducers: {
    [regAccount.pending]: (state) => {
      state.loading = true;
    },
    [regAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    },
    [regAccount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [loginAccount.pending]: (state) => {
      state.loading = true;
    },
    [loginAccount.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action);
      state.isAuth = true;
      localStorage.setItem("isAuth", true);
      localStorage.setItem("data", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.error = "";
    },
    [loginAccount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [myAccount.pending]: (state) => {
      state.loading = true;
    },
    [myAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.myUser = action.payload.data;
      state.error = "";
    },
    [myAccount.rejected]: (state, action) => {
      state.loading = false;
      // console.log(action);
      localStorage.removeItem("isAuth", false);
      localStorage.removeItem("data");
      state.error = action.payload.authed;
    },
    [getForUser.pending]: (state) => {
      state.loading = true;
    },
    [getForUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.doc = action.payload.data;
      state.error = "";
    },
    [getForUser.rejected]: (state, action) => {
      state.loading = false;
      // state.data = "";
      state.error = action.error;
    },
  },
});

export const { authenticatedUser, unauthenticatedUser } = accountSlice.actions;

export default accountSlice.reducer;

// export const accountsApi = createApi({
//   reducerPath: "accountApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/",
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     regAccount: builder.mutation({
//       query: (regValues) => ({
//         url: `/api/register`,
//         method: "POST",
//         body: regValues,
//       }),
//     }),
//     loginAccount: builder.mutation({
//       query: (loginValues) => ({
//         url: `/api/login`,
//         method: "POST",
//         body: loginValues,
//       }),
//     }),
//     logoutAccount: builder.query({
//       query: () => ({
//         url: `/api/logout`,
//         method: "POST",

//       }),
//     }),
//   }),
// });

// export const {
//   useRegAccountMutation,
//   useLoginAccountMutation,
//   useLogoutAccountMutation,
// } = accountsApi;
