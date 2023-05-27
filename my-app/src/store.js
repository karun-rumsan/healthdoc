import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import accountSlice from "./redux/accountSlice/accountSlice";
import chatSlice from "./redux/chatSlice/chatSlice";
import reqresSlice from "./redux/reqresSlice/reqresSlice";
// import { accountsApi } from "./redux/accountSlice/accountSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    reqres: reqresSlice,
    chatSlice: chatSlice,
    // [accountsApi.reducerPath]: accountsApi.reducer,
  },
  // middleware: (getdefaultMiddleware) => {
  //   return getdefaultMiddleware();
  // },
  // devTools:
});

// setupListeners(store.dispatch);
