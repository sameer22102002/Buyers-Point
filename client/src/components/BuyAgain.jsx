import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const BuyAgainContainer = styled.div`
  margin-top: 40px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 100vw;
  overflow: hidden; /* Hide vertical scrollbar */
`;

const CustomSlider = styled(Slider)`
  .slick-dots {
    bottom: -25px;
    li {
      button {
        &:before {
          font-size: 10px;
          color: #fff;
          opacity: 0.5;
        }
      }
      &.slick-active {
        button {
          &:before {
            opacity: 1;
          }
        }
      }
    }
  }
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductName = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const NoTextDecorationLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* To inherit the color from parent element */
`;

const BuyAgain = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [boughtProducts, setBoughtProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userRequest.get(`/orders/find/${user?._id}`);
        const orders = response.data;
        // Extract the products from the orders
        const products = orders.flatMap((order) => order.products);
        // Create a map to store products based on their _id to ensure uniqueness
        const uniqueProductsMap = new Map();
        products.forEach((product) => {
          if (!uniqueProductsMap.has(product.productId)) {
            uniqueProductsMap.set(product.productId, product);
          }
        });
        // Convert the map back to an array of unique products
        const uniqueProducts = Array.from(uniqueProductsMap.values());
        setBoughtProducts(uniqueProducts);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user?._id]);
  console.log(boughtProducts);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {boughtProducts.length > 0 && (
        <BuyAgainContainer>
          <h3>Buy Again</h3>
          <CustomSlider {...settings}>
            {boughtProducts.map((product) => (
              <ProductCard>
                <ProductImage src={product.img} alt={product.title} />
                <NoTextDecorationLink
                  key={product.productId}
                  to={`/product/${product.productId}`}
                >
                  <ProductName>{product.title}</ProductName>
                </NoTextDecorationLink>
              </ProductCard>
            ))}
          </CustomSlider>
        </BuyAgainContainer>
      )}
    </>
  );
};

export default BuyAgain;
