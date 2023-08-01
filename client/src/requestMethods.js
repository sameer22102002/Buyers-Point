import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTA1YmQ5YmIwOTRkMjZhYjEwN2RmYSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODgyNjM5MzcsImV4cCI6MTY4ODQzNjczN30.BJOt0n0tAIu9J8gTh3E3dDRjGDwg84kHcPIcfrKH6Zs";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken)
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
 