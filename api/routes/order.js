const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Order = require("../models/Order");

//create a order
router.post("/", verifyToken, async (req, res) => {
  // console.log(req.body);
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      products: req.body.products,
      amount: req.body.amount,
      address: req.body.address,
      status: req.body.status || "pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

//update the a order
router.delete(
  "/:id/:orderId/products/:productId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const { id, orderId, productId } = req.params;
      const order = await Order.findOne({ _id: orderId });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      // Remove the product from the order
      order.products = order.products.filter(
        (product) => product.productId.toString() !== productId
      );

      await order.save();
      res.status(200).json({ message: "Product removed from the order" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//delete a order
router.delete(
  "/:id/:orderId",
  verifyTokenAndAuthorization,
  async (req, res) => {
    console.log(req.params);
    try {
      const order = await Order.findById(req.params.orderId);
      // Check if the order exists
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      // Check if the order belongs to the logged-in user
      if (order.userId !== req.params.id) {
        return res
          .status(403)
          .json({ error: "You are not authorized to delete this order" });
      }
      await Order.findByIdAndDelete(req.params.orderId);
      res.status(200).json("Order removed successfully...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get user order
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 2));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 2));
  const productId = req.params.pid;

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//if completer delete the order
router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;
