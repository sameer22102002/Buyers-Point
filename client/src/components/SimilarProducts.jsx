import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import "./searchInput.css"

const Container = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px 30px;
  border-radius: 15px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const ProductsContainer = styled.div`
  overflow-y: auto;
  max-height: 600px; 
`;

const ProductsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductItem = styled.li`
  width: calc(33.33% - 20px);
  margin-right:10px;
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  margin: 15px 10px;
  text-align: center;
  color: #333;
`;

const ViewButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const SimilarProducts = ({ productId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await publicRequest.get(`/products/similar/${productId}`);
        setSimilarProducts(response.data);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  return (
    <Container>
      <Heading>Similar Products</Heading>
      <ProductsContainer>
        <ProductsList>
          {similarProducts.map((product) => (
            <ProductItem key={product._id}>
              <ProductLink to={`/product/${product._id}`}>
                <ProductImage src={product.img} alt={product.title} />
                <ProductTitle>{product.title}</ProductTitle>
                <ViewButton>View Details</ViewButton>
              </ProductLink>
            </ProductItem>
          ))}
        </ProductsList>
      </ProductsContainer>
    </Container>
  );
};

export default SimilarProducts;
