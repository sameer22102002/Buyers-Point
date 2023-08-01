const router = require("express").Router();
const Complaint = require("../models/Complaint");

//get all complains by admin
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Error fetching complaints" });
  }
});

// Route to submit a complaint
router.post("/", async (req, res) => {
  const { name, email, pid, message } = req.body;

  try {
    const newComplaint = new Complaint({
      name,
      email,
      pid,
      message,
    });

    await newComplaint.save();
    res.json({ message: "Complaint submitted successfully" });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ error: "Error submitting complaint" });
  }
});

//delete a complaint
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete(id);
    res.status(200).json({ message: "Complaint deleted successfully." });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Failed to delete complaint." });
  }
});

module.exports = router;
