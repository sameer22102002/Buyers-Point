const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

//update the user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.newPassword) {
    req.body.newPassword = CryptoJS.AES.encrypt(
      req.body.newPassword,
      process.env.CRYPTO_KEY
    ).toString();
  }
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.body.curPassword) {
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_KEY
      ).toString(CryptoJS.enc.Utf8);

      if (req.body.curPassword !== decryptedPassword) {
        return res.status(401).json({ message: "Incorrect current password" });
      }
    } else {
      return res.status(401).josn("please provide your current password!");
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username || user.username,
          email: req.body.email || user.email,
          password: req.body.newPassword || user.password,
          contact: req.body.contact || user.contact,
          address: req.body.address || user.address,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a user
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted successfully...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a user
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users by admin
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user stats by admin
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//forgot password for a user
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "30m",
    });

    const link = `http://localhost:3000/reset-password/${user._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'damkondwarsameer283@gmail.com',
        pass: process.env.EMAIL_AUTH
      }
    });
    
    var mailOptions = {
      from: 'damkondwarsameer283@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: link
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("->>---------------------" + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    console.log(link);
  } catch (err) {
    console.log(err);
  }
});

//reset password
router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY
    ).toString();

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      try {
        user.password = encryptedPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error saving password" });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error finding user" });
  }
});

module.exports = router;
