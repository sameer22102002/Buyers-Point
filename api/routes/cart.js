const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Cart = require("../models/Cart");
const User = require("../models/User");

//update the cart
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     const { userId, productId, quantity, price } = req.body;
//     const cart = await Cart.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           cart: { productId: productId, quantity: quantity, price: price },
//         },
//       },
//       { new: true }
//     );
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.put("/:id", async (req, res) => {
  try {
    const {
      userId,
      productId,
      quantity,
      productPrice,
      color,
      size,
      img,
      title,
    } = req.body;
    console.log({
      userId,
      productId,
      quantity,
      productPrice,
      color,
      size,
      img,
      title,
    });
    const cart = await Cart.findOneAndUpdate(
      { userId: userId },
      {
        $push: {
          products: {
            productId: productId,
            quantity: quantity,
            productPrice: productPrice,
            color: color,
            size: size,
            img: img,
            title: title,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a element form a cart
router.delete(
  "/:userId/cart/:productId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const { userId, productId } = req.params;

      // Remove the product from the cart
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId } } },
        { new: true }
      );

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error("Error removing product from cart:", error);
      res.status(500).json({ error: "Unable to remove product from cart" });
    }
  }
);

//get user cart
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  // console.log(req.headers.token);
  try {
    const cart = await Cart.findOne({ userId: req.params.id });

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all carts by admin
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
