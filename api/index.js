const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe") 
const commentRoute = require("./routes/comment");
const complaintRoute = require("./routes/complain")
const cors = require("cors")

app.use(express.json())
dotenv.config();
mongoose.connect( process.env.MONGO_URL ).then(() => console.log("Database is connected!")).catch((err) => console.log(err));


app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/comment", commentRoute);
app.use("/api/complaint", complaintRoute);


app.listen(5000, () => {
    console.log("Backend server is running!");
})