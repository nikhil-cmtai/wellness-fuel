import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./features/blogsSlice";
import categoryReducer from "./features/categorySlice";
import productReducer from "./features/productSlice";
import leadReducer from "./features/leadSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    categories: categoryReducer,
    products: productReducer,
    leads: leadReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;