const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: { type: String },
        productPrice: { type: Number },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        title: { type: String },
        size: { type: String },
        img: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
