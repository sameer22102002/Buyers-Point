import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import styled from "styled-components";
import { userRequest } from "../requestMethods"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 88vh;
  background-color: #f9f9f9;
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #635985;
    box-shadow: 0 0 5px rgba(99, 89, 133, 0.3);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  resize: vertical;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #635985;
    box-shadow: 0 0 5px rgba(99, 89, 133, 0.3);
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  background-color: #635985;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #443c68;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #00aa00;
  text-align: center;
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #cc0000;
  text-align: center;
`;

const CustomerCare = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pid: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userRequest.post("/complaint", formData);

      setFormData({
        name: "",
        email: "",
        pid: "",
        message: "",
      });

      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("Failed to send message. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Navbar />
      <Announcement />
      <Container>
        <FormContainer>
          <FormTitle>Contact Customer Care</FormTitle>
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="pid">Subject:</Label>
              <Input
                type="text"
                name="pid"
                value={formData.pid}
                onChange={handleChange}
                placeholder="Product Id or Order Id"
                required
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="message">Message:</Label>
              <TextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
              />
            </InputContainer>
            <SubmitButton type="submit">Submit</SubmitButton>
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        </FormContainer>
      </Container>
    </div>
  );
};

export default CustomerCare;
