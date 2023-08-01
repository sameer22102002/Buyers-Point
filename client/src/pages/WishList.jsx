import React, { useEffect, useState } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import { userRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { dislikeWishlist } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import Footer from "../components/Footer"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
`;

const WishlistItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
  color: #333;
`;

const ProductId = styled.span`
  font-size: 14px;
  color: #888;
`;

const ProductSize = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
`;

const ProductColorContainer = styled.div`
  display: flex;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  width: 80px;
  padding: 8px;
  border: none;
  background-color: #ff6b6b;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f04343;
  }
`;

const EmptyWishlist = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
`;

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const productIds = user?.wishlist;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchWishlist();
  }, [user?.wishlist]);

  const fetchWishlist = async () => {
    try {
      const wishlistItems = [];
      for (const productId of productIds) {
        const response = await publicRequest.get(`/products/find/` + productId);
        wishlistItems.push(response.data);
      }
      setWishlist(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleClick = async (id) => {
    const res = await userRequest.put(
      `http://localhost:5000/api/products/dislike/${id}`,
      { userId: user?._id }
    );
    dislikeWishlist(dispatch, id);
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Title>Wishlist</Title>
        {wishlist.length === 0 ? (
          <EmptyWishlist>No items in the wishlist</EmptyWishlist>
        ) : (
          <ul>
            {wishlist.map((item) => (
              <WishlistItem key={item._id}>
                <Info>
                  <Product>
                    <ProductDetail>
                      <Link to={`/product/${item._id}`}>
                        <Image src={item.img} alt={item.title} />
                      </Link>
                      <Details>
                        <ProductName>{item.title}</ProductName>
                        <ProductId>{item._id}</ProductId>
                        <ProductSize>
                          {"sizes - "}
                          {item.size.map((sz) => `${sz} `)}
                        </ProductSize>
                        <ProductColorContainer>
                          {item.color.map((c) => (
                            <ProductColor key={c} color={c} />
                          ))}
                        </ProductColorContainer>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductPrice>₹{item.price}</ProductPrice>
                      <RemoveButton onClick={() => handleClick(item._id)}>
                        Remove
                      </RemoveButton>
                    </PriceDetail>
                  </Product>
                </Info>
              </WishlistItem>
            ))}
          </ul>
        )}
      </Container>
      <Footer/>
    </>
  );
};

export default WishlistPage;
