import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./analysisPage.css";

const AnalysisPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await userRequest.get("/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await userRequest.get("/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);

  const calculateTotalSoldProducts = (productId) => {
    if (!orders || orders.length === 0) {
      return 0;
    }

    return orders.reduce((total, order) => {
      if (order.products) {
        return (
          total +
          order.products.reduce((count, product) => {
            if (product.productId === productId) {
              return count + product.quantity;
            }
            return count;
          }, 0)
        );
      }
      return total;
    }, 0);
  };

  return (
    <div className="analysisPageContainer">
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Product Analysis
      </h1>
      <table className="analysisTable">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock Available</th>
            <th>Sales Count</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.img} alt={product.title} className="productImage" />
              </td>
              <td>{product._id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.instock ? "Available" : "Not Available"}</td>
              <td>{calculateTotalSoldProducts(product._id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalysisPage;
