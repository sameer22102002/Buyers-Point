import { loginFailure, loginStart, loginSuccess, logoutStart, likestart, dislikestart, resetUser } from "./userRedux";
import { addProduct, getCart, removeProduct, resetCart }  from "./cartRedux"
import { toggleDarkMode } from "./darkModeRedux"
import { publicRequest, userRequest } from "../requestMethods";
import axios from "axios"
const BASE_URL = "http://localhost:5000/api/";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    // console.log(res.data.accessToken)
    dispatch(loginSuccess(res.data));
    const res1 = await axios.get(`http://localhost:5000/api/carts/find/${res.data._id}`,{headers: { token: `Bearer ${res.data.accessToken}` }});
    // console.log(res1.data)  
    dispatch(getCart(res1.data))  
  } catch (err) {
    dispatch(loginFailure()); 
  }
}; 

export const logout = (dispatch) => {
  dispatch(logoutStart());
}

export const likeWishlist = (dispatch, productid) => {
  dispatch(likestart(productid));
}

export const dislikeWishlist = (dispatch, productid) => {
  dispatch(dislikestart(productid));
}

export const addToCart = (dispatch, productDetail) => {
  dispatch(addProduct(productDetail));
}

export const deleteFromCart = (dispatch, productId) => {
  dispatch(removeProduct(productId));
}

export const nullUser = (dispatch) => {
  dispatch(resetUser());
}

export const nullCart = (dispatch) => {
  dispatch(resetCart());
}

export const changeMode = (dispatch) => {
  dispatch(toggleDarkMode());
}
