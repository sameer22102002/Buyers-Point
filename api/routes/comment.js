const router = require("express").Router();
const Comment = require("../models/Comment");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

//get all commnets
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all comments for a specific product
router.get("/:productId", async (req, res) => {
  try {
    const comments = await Comment.find({ productId: req.params.productId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add a new comment
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a comment
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.body.id,
      {
        $set: { content: req.body.content },
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  // console.log(req.params.id)
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to fetch comments for a specific user
router.get("/:id/:username", verifyTokenAndAuthorization, async (req, res) => {
  // console.log(req.params.username)
  try {
    const userId = req.params.username;
    const comments = await Comment.find({ userId });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
});

module.exports = router;
