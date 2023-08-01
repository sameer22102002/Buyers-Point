import React, { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.7)
  ),
  url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  animation: ${fadeIn} 0.8s;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: teal;
  }
`;

const Button = styled.button`
  padding: 15px 0;
  border: none;
  background-color: teal;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #a7a7a7;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #1a8f92;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const LinkStyled = styled(Link)`
  color: teal;
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  transition: color 0.3s ease;

  &:hover {
    color: #1a8f92;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleClick} disabled={isFetching}>
              {isFetching ? "Logging In..." : "LOGIN"}
            </Button>
            {error && <Error>Something went wrong. Please try again.</Error>}
            <LinkStyled to={"/forgot-password"}>Forgot Password?</LinkStyled>
            <LinkStyled to={"/register"}>CREATE A NEW ACCOUNT</LinkStyled>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;