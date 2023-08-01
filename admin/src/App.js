import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import CommentsPage from "./pages/comments/Comments";
import TransactionsPage from "./pages/transaction/Transaction";
import Complains from "./pages/complains/Complains"
import AnalysisPage from "./pages/analysis/AnalysisPage";

function App() {
  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user
  )?.currentUser?.isAdmin;
  // console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.currentUser?.isAdmin)
  // const admin = true;
  return (
    <div>
      <createBrowserRouter>
        {admin && <Topbar />}
        <div className="container">
          {admin && <Sidebar />}
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
            {admin && (
              <>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/users" element={<UserList />}></Route>
                <Route exact path="/user/:userId" element={<User />}></Route>
                <Route exact path="/newUser" element={<NewUser />}></Route>
                <Route exact path="/products" element={<ProductList />}></Route>
                <Route
                  exact
                  path="/product/:productId"
                  element={<Product />}
                ></Route>
                <Route
                  exact
                  path="/newproduct"
                  element={<NewProduct />}
                ></Route>
                <Route
                  exact
                  path="/comments"
                  element={<CommentsPage />}
                ></Route>
                <Route
                  exact
                  path="/transactions"
                  element={<TransactionsPage />}
                ></Route>
                <Route
                  exact
                  path="/complains"
                  element={<Complains />}
                ></Route>
                <Route
                  exact
                  path="/analysis"
                  element={<AnalysisPage />}
                ></Route>
              </>
            )}
          </Routes>
        </div>
      </createBrowserRouter>
    </div>
  );
}

export default App;
