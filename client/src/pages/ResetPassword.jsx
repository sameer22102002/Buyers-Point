import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";

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

const Form = styled.form`
  width: 300px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Message = styled.p`
  text-align: center;
  color: ${({ error }) => (error ? "red" : "green")};
  margin-top: 10px;
`;

const ResetPassword = () => {
  const { token, id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  console.log(token) 
  console.log(id)  



  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match"); 
      setError(true);
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/users/reset-password/${id}/${token}`, {password});
      setMessage(res.data.message);
      setError(false);
    } catch (error) { 
      console.error("Error resetting password:", error);
      setMessage("An error occurred while resetting the password");
      setError(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>Reset Password</Title>
          <Label>New Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Label>Confirm Password:</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> 
          <Button type="submit">Reset Password</Button>
          {message && <Message error={error}>{message}</Message>}
        </Form>
      </Container>
    </>
  );
};

export default ResetPassword;
