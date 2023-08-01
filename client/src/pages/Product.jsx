import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Rating from "../components/rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addToCart } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import axios from "axios";
import { useSelector } from "react-redux";
import { likeWishlist, dislikeWishlist } from "../redux/apiCalls";
import Comments from "../components/Comments";
import SimilarProducts from "../components/SimilarProducts";
import BuyAgain from "../components/BuyAgain"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Temp = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
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

const ProductContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CommentsContainer = styled.div`
  flex: 1;
  min-width: 320px;
`;

const SimilarProductsContainer = styled.div`
  flex: 1;
  min-width: 320px;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [isWishlisted, setisWishlisted] = useState(user?.wishlist.includes(id));

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = async () => {
    addToCart(dispatch, {
      productId: product?._id,
      quantity: quantity,
      productPrice: product.price,
      color: color,
      size: size,
      img: product.img,
      title: product.title,
    });
    const res = await axios.put(`http://localhost:5000/api/carts/${id}`, {
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

  const handleClicklike = async () => {
    const res = await userRequest.put(
      `http://localhost:5000/api/products/like/${id}`,
      { userId: user?._id }
    );
    setisWishlisted(!isWishlisted);
    likeWishlist(dispatch, id);
  };
  const handleClickdislike = async () => {
    const res = await userRequest.put(
      `http://localhost:5000/api/products/dislike/${id}`,
      { userId: user?._id }
    );
    setisWishlisted(!isWishlisted);
    dislikeWishlist(dispatch, id);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Temp>
            <Title>{product.title}</Title>
            <Rating />
          </Temp>
          <Icon>
            {!isWishlisted ? (
              <FavoriteBorderOutlinedIcon onClick={handleClicklike} />
            ) : (
              <FavoriteIcon onClick={handleClickdislike} />
            )}
          </Icon>
          <Desc>{product.desc}</Desc>
          <Price>₹ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <ProductContent>
        <CommentsContainer>
          <Comments />
        </CommentsContainer>

        <SimilarProductsContainer>
          <SimilarProducts productId={id} />
        </SimilarProductsContainer>
      </ProductContent>
      {user && <BuyAgain/>}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
