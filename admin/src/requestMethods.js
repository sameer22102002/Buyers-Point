import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWQ1MDRmNmNiMDE3MWU2NDUzNGYwNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4ODAzMTM3NSwiZXhwIjoxNjg4MjA0MTc1fQ.1b20c4zBXNzDyO1nY9IyYfFrdaFFjUNyFMfrxKZQsTE";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:user")).user).currentUser.accessToken

// console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:user")).user).currentUser.accessToken) 
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
