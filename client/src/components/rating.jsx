import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import StarHalfIcon from '@mui/icons-material/StarHalf';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarButton = styled(StarIcon)`
  cursor: pointer;
  font-size: 25px;
  color: ${(props) => (props.active ? "gold" : "gray")};
  transition: color 0.3s ease;

  &:hover {
    color: gold;
  }
`;

const Rating = () => {
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = async (value) => {
    try {
      const response = await userRequest.put(
        `http://localhost:5000/api/products/${id}/add-rating`,
        { userId: user?._id, value: value }
      );
      fetchRating();
      alert(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error);
      } else {
        alert("Unable to add rating. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  const fetchRating = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}/calculate-rating`
      );
      const averageRating = response.data;
      setRating(averageRating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  return (
    <RatingContainer>
      {[1, 2, 3, 4, 5].map((value) => (
        <StarButton
          key={value}
          active={rating >= value}
          onClick={() => handleClick(value)}
        />
      ))}
    </RatingContainer>
  );
};

export default Rating;
