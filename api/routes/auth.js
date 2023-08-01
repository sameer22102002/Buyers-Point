const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart")

//register a user
// router.post("/register", async (req, res) => {
//   const newUser = new User({
//     username: req.body.username,
//     email: req.body.email,
//     password: CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.CRYPTO_KEY
//     ).toString(),
//   });
//   try {
//     const savedUser = await newUser.save();
//     res.status(200).json(savedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.post("/register", async (req, res) => {
  console.log(req.body)
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();

    const newCart = new Cart({
      userId: savedUser._id, // Associate cart with the user
    });

    const savedCart = await newCart.save();

    savedUser.cartId = savedCart._id; // Store cart ID in the user
    await savedUser.save();
    
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("User Not Found!");
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_KEY
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      const inputPassword = req.body.password;

      if (originalPassword !== inputPassword) {
        res.status(401).json("Wrong Password");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
          );
          

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
