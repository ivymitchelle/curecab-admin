import { configureStore } from "@reduxjs/toolkit";
import ModalSlice from "./features/ModalSlice";
import AuthSlice from "./features/AuthSlice";
import OrderSlice from "./features/OrderSlice";

const store = configureStore({
  reducer: {
    modals: ModalSlice,
    auth: AuthSlice,
    orders: OrderSlice,
  },
});

export default store;
