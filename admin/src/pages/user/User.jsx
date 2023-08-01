import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublishIcon from "@mui/icons-material/Publish";
import { format } from "timeago.js";
import "./user.css";

export default function User() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState({});
  const [transactions, setTransactions] = useState({});
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userRequest.get(`/users/find/${id}`);
        const userData = response.data;
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setPhone(userData.contact);
        setAddress(userData.address);
        setCreatedAt(format(userData.createdAt));
        setWishlist(userData.wishlist);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await userRequest.get(`/carts/find/${user._id}`);
        const cartData = response.data;
        setCart(cartData);
      } catch (error) {
        console.error("Error getting cart:", error);
      }
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await userRequest.get(`/orders/find/${user._id}`);
        const transactionData = response.data;
        setTransactions(transactionData);
        console.log(transactionData);
      } catch (error) {
        console.error("Error getting transactions:", error);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <AccountCircleOutlinedIcon style={{ fontSize: "40px" }} />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">Created: {createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="userUpdateItem"></div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <PublishIcon className="userUpdateIcon" />
                </label>
              </div>
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="userWishlist">
        <h3>User Wishlist</h3>
        <div className="wishlistItems">
          {wishlist?.map((productId) => (
            <div className="wishlistItem" key={productId}>
              {productId && (
                <div>
                  <span>Product ID: {productId}</span>
                  {/* Fetch and display product information here */}
                  {/* You can use fetchProduct function to get the product data */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="userCart">
        <h3>User Cart</h3>
        <div className="cartItems">
          {cart?.products?.map((product) => (
            <div className="cartItem" key={product.productId}>
              {product && (
                <div>
                  <span>Product ID: {product.productId}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="transactions">
        <h3>User Orders & Transactions</h3>
        <div className="transactionsContainer">
          {Object.keys(transactions).map((transactionId) => (
            <div className="transactionItem" key={transactionId}>
              {transactions[transactionId] && (
                <div>
                  <p className="transactionId">
                    Order ID: {transactions[transactionId]._id}
                  </p>
                  <p className="transactionAmount">
                    Amount: {transactions[transactionId].amount}
                  </p>
                  <p className="transactionStatus">
                    Status: {transactions[transactionId].status}
                  </p>
                  <div className="transactionProducts">
                    <span>Items Purchased: </span>
                    {transactions[transactionId].products.map((product) => (
                      <div className="transactionProduct" key={product._id}>
                        <span className="productTitle">{product.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
