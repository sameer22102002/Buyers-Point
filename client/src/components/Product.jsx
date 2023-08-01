import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import { likeWishlist, dislikeWishlist } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  ${"" /* display:flex; */}
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${"" /* flex-direction: column; */}

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.5);
  }
`;

const Product = ({ item }) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const quantity = 1;
  const color = "red";
  const size = "M";

  const [isWishlisted, setisWishlisted] = useState(
    user?.wishlist.includes(item._id)
  );

  console.log(user?.wishlist);

  const handleClick = async () => {
    const res = await userRequest.put(
      `http://localhost:5000/api/products/like/${item._id}`,
      { userId: user?._id }
    );
    setisWishlisted(!isWishlisted);
    likeWishlist(dispatch, item._id);
  };
  const handleClicknot = async () => {
    const res = await userRequest.put(
      `http://localhost:5000/api/products/dislike/${item._id}`,
      { userId: user?._id }
    );
    setisWishlisted(!isWishlisted);
    dislikeWishlist(dispatch, item._id);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + item._id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [item._id]);

  const handleCartClick = async () => {
    dispatch(
      addProduct({
        productId: item._id,
        productPrice: item.price,
        quantity,
        color,
        size,
        img: item.img,
        title: item.title,
      })
    );
    const res = await axios.put(`http://localhost:5000/api/carts/${item._id}`, {
      userId: user?._id,
      productId: product?._id,
      quantity: quantity,
      productPrice: product.price,
      color: color,
      size: size,
      img: product.img,
      title: product.title,
    });
  };

  return (
    <>
      <Container>
        <Circle />
        <Image src={item.img} />
        <Info>
          <Icon>
            <ShoppingCartOutlinedIcon onClick={handleCartClick} />
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            {!isWishlisted ? (
              <FavoriteBorderOutlinedIcon onClick={handleClick} />
            ) : (
              <FavoriteIcon onClick={handleClicknot} />
            )}
          </Icon>
        </Info>
      </Container>
    </>
  );
};

export default Product;
