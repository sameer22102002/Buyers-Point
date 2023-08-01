import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";

const Container = styled.div`
  height: 55vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  background-image: linear-gradient(to bottom, #fcf5f5, #f0f0f0);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Desc = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 30px;
  color: #555;
  max-width: 600px;
  text-align: center;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  border: 2px solid lightgray;
  border-radius: 5px;
  overflow: hidden;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: teal;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: none;
  outline: none;
  font-size: 1.2rem;
  color: #333;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &::placeholder {
    color: #999;
  }

  &:focus {
    background-color: #f0f8ff;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 18px;
  background-color: teal;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 0 5px 5px 0;

  &:hover {
    background-color: #008080;
  }
`;

const Icon = styled(SendIcon)`
  font-size: 1.8rem;
  color: white;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  margin-top: 40px;
`;

const SocialIcon = styled.div`
  font-size: 2rem;
  color: #333;
  margin: 0 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: teal;
  }
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Subscribe to Our Newsletter</Title>
      <Desc>Get timely updates from your favorite products and never miss a sale.</Desc>
      <InputContainer>
        <Input placeholder="Your email address" />
        <Button>
          <Icon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
