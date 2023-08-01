import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import Announcement from "../components/Announcement";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Title = styled.h1`
  font-weight: 500;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 32px;
`;

const Orignal = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: flex-start;
  animation: ${fadeIn} 1s;
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  margin: 15px;
`;

const OrdersList = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 30px;
  position: relative;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div``;

const CancelButton = styled.button`
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828;
  }
`;

const EditButton = styled.button`
  background-color: #43a047;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

const EditButtonCancel = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }
`;

const OrderItem = styled.div`
  margin-bottom: 30px;
`;

const OrderDetails = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserInfo = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 30px;
  font-size: 18px;
  flex: 1;
  max-height: 400px;
  margin-right: 20px;
`;

const SingleInfo = styled.p`
  margin: 15px 0;
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const RemoveButton = styled.button`
  background-color: #e53935;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 15px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Date = styled.span`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 12px;
  color: #777;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #222;
`;

const ProductId = styled.span`
  font-size: 14px;
  color: #666;
`;

const ProductAmount = styled.span`
  font-size: 14px;
`;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const [editOrder, setEditOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await userRequest.get(`/orders/find/${user._id}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmed) {
      try {
        await userRequest.delete(`/orders/${user._id}/${orderId}`);
        window.location.reload();
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    }
  };

  const handleEditOrder = (orderId) => {
    setEditOrder(orderId);
  };

  const handleRemoveProduct = async (orderId, productId) => {
    try {
      await userRequest.delete(
        `/orders/${user._id}/${orderId}/products/${productId}`
      );

      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (order._id === orderId) {
            const updatedProducts = order.products.filter(
              (product) => product.productId !== productId
            );
            return { ...order, products: updatedProducts };
          }
          return order;
        });
        return updatedOrders;
      });

      console.log("Product removed successfully");
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <Title>My Orders</Title>
      <Orignal>
        <OrdersContainer>
          {orders.length === 0 ? (
            <OrdersList>
              <p>No orders have been placed yet!</p>
            </OrdersList>
          ) : (
            orders.map((order) => (
              <OrderItem key={order._id}>
                <OrdersList>
                  <OrderHeader>
                    <h3>Order ID: {order._id}</h3>
                    {editOrder !== order._id ? (
                      <ButtonContainer>
                        <CancelButton
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </CancelButton>
                        <EditButton onClick={() => handleEditOrder(order._id)}>
                          Edit Order
                        </EditButton>
                      </ButtonContainer>
                    ) : (
                      <ButtonContainer>
                        <EditButtonCancel
                          onClick={() => handleEditOrder(null)}
                        >
                          X
                        </EditButtonCancel>
                      </ButtonContainer>
                    )}
                  </OrderHeader>
                  <OrderDetails>
                    <p>Order Status: {order.status}</p>
                    <p>Amount: ₹{order.amount}</p>
                    <p>Shipping Address: {order.address}</p>
                    <p>Products:</p>
                    {order.products.map((product) => (
                      <Product key={product.productId}>
                        <ProductDetail>
                          <Link to={`/product/${product?.productId}`}>
                            <Image src={product.img} alt={product.title} />
                          </Link>
                          <Details>
                            <ProductName>{product.title}</ProductName>
                            <ProductId>ID: {product.productId}</ProductId>
                            <ProductAmount>Quantity: {product.quantity}</ProductAmount>
                          </Details>
                        </ProductDetail>
                        {editOrder === order._id && (
                          <RemoveButton
                            onClick={() =>
                              handleRemoveProduct(order._id, product.productId)
                            }
                          >
                            Remove
                          </RemoveButton>
                        )}
                      </Product>
                    ))}
                    <Date>{format(order.createdAt)}</Date>
                  </OrderDetails>
                </OrdersList>
              </OrderItem>
            ))
          )}
        </OrdersContainer>
        <UserInfo>
          <h2>Destination Info</h2>
          <SingleInfo>Name: {user?.username}</SingleInfo>
          <SingleInfo>Address: {user?.address}</SingleInfo>
          <SingleInfo>Contact: {user?.contact}</SingleInfo>
          <SingleInfo>Email: {user?.email}</SingleInfo>
        </UserInfo>
      </Orignal>
    </>
  );
};

export default OrdersPage;
