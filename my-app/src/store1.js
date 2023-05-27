import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { api } from "./features/api";
import accountReducer from "./features/accountSlice";
import { apiSliceApi } from "./api/apiSlice";

export const store1 = configureStore({
  reducer: {
    [apiSliceApi.reducerPath]: apiSliceApi.reducer,
    account: accountReducer,
  },
  middleware: (getdefaultMiddleware) => {
    return getdefaultMiddleware().concat(apiSliceApi.middleware);
  },
});
