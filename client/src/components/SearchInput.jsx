import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import "./searchInput.css";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  color: ${({ theme }) => theme.textPrimary};
  background-color: transparent;
  width: 250px;
  font-size: 16px;
  margin-left: 10px;

  &::placeholder {
    color: #aaa;
  }
`;

const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  border-radius: 10px;
  width: 40px;
  height: 30px;
  margin-right: 5px;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 55px;
  left: 90px;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid lightgray;
  background-color: white;
  z-index: 1;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    img {
    width: 80px;
    height: 80px;
  }

  }

  img {
    width: 70px;
    height: 70px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  color: #888;
  font-size: 14px;
`;

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const searchText = e.target.value.toLowerCase();
    setQuery(searchText);
    if (searchText.length > 0) {
      try {
        const response = await publicRequest.get(`/products/search/${searchText}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching for products:", error);
      }
    }
  };

  const handleItemClick = (productId) => {
    setQuery("");
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <SearchContainer>
        <SearchIconContainer>
          <SearchIcon style={{ color: "gray", fontSize: 24 }} />
        </SearchIconContainer>
        <Input
          placeholder="Search for products..."
          value={query}
          onChange={handleInputChange}
        />
      </SearchContainer>
      {query.length > 0 && (
        <MenuContainer>
          {searchResults.map((result) => (
            <MenuItem key={result._id} onClick={() => handleItemClick(result._id)}>
              <img src={result.img} alt={result.title} />
              <ProductInfo>
                <ProductTitle>{result.title}</ProductTitle>
                <ProductPrice>₹ {result.price}</ProductPrice>
              </ProductInfo>
            </MenuItem>
          ))}
        </MenuContainer>
      )}
    </div>
  );
};

export default SearchInput;
