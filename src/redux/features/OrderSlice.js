import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  selectedOrder: null,
};
const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.sort((a, b) => {
        return (
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
      });
    },
    selectOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    updateOrder: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (order) => order.orderId === action.payload.orderId
      );
      state.orders[orderIndex] = action.payload;
    },
  },
});

export const { selectOrder, updateOrder, setOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
