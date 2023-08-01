const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product = require("../models/Product");
const User = require("../models/User");

//search a product
router.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update the product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product removed successfully...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCat = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (qCat) {
      products = await Product.find({ categories: { $in: [qCat] } });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get similar products based on category
router.get("/similar/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const qCategories = product.categories;
    const similarProducts = await Product.find({
      _id: { $ne: productId },
      categories: { $in: qCategories },
    });

    res.json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//search a product
router.get("/products", async (req, res) => {
  const { q } = req.query;
  const search = q
    ? {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      }
    : {};
  try {
    const data = await Product.find(search);
    if (data.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No products found.",
      });
    }
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({
      message: "Failed to search products.",
    });
  }
});

//add a product in wishlist
router.put("/like/:id", async (req, res) => {
  const productId = req.params.id;
  const userId = req.body.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { wishlist: productId } },
      { upsert: true, new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//remove a product in wishlist
router.put("/dislike/:id", async (req, res) => {
  const productId = req.params.id;
  const userId = req.body.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    );
    res.status(200).json(updatedUser.wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get rating of product
router.get("/:id/calculate-rating", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const ratings = product.rating.map((rating) => rating.value);
    const sum = ratings.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const averageRating = sum / ratings.length;

    res.status(200).json(averageRating);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//add the rating of the user
router.put("/:productId/add-rating", verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, value } = req.body;

    // Check if the user has already rated the product
    const product = await Product.findById(productId);
    // console.log(product.rating)
    const existingRating = product.rating.find(
      (rating) => rating.userId === userId
    );

    if (existingRating) {
      return res
        .status(400)
        .json({ error: "User has already rated the product" });
    }

    // Add the new rating to the rating array
    product.rating.push({ userId, value });
    await product.save();

    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ error: "Unable to add rating" });
  }
});

module.exports = router;
