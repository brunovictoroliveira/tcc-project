// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/authSlice";
import customerReducer from "./features/customerSlice";
import noteReducer from "./features/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    notes: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
