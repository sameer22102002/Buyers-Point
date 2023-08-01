import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: null,
    quantity: 0,
    total: 0,
  },
  reducers: {
    getCart: (state, action) => {
      state.userCart = action.payload;
      state.quantity = action.payload.products.length;
      state.total = calculateTotal(action.payload.products);
    },
    addProduct: (state, action) => {
      const { productId, quantity, productPrice, color, size, img, title } =
        action.payload;
      state.quantity += 1;
      state.userCart.products.push({
        productId,
        quantity,
        productPrice,
        color,
        size,
        img,
        title,
      });
      state.total += productPrice * quantity;
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      const productIndex = state.userCart.products.findIndex(
        (product) => product.productId === productId
      );
      if (productIndex !== -1) {
        const product = state.userCart.products[productIndex];
        state.quantity -= 1;
        state.total -= product.productPrice * product.quantity;
        state.userCart.products.splice(productIndex, 1);
      }
    },
    resetCart: (state) => {
      state.userCart = null;
      state.quantity = 0;
      state.total = 0;
    },
  },
});

const calculateTotal = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.productPrice * product.quantity;
  });
  return total;
};

export const { addProduct, getCart, removeProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
