import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
// import { resetPassword } from "../redux/apiCalls";
import axios from 'axios'
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &::disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
//   const dispatch = useDispatch();
//   const { isFetching, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // resetPassword(dispatch, email);
    try{
        const res = await publicRequest.post('/users/forgot-password', { email });
        console.log(res.data);
    }catch(err){
        console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>FORGOT PASSWORD</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">RESET PASSWORD</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default ForgotPassword;
