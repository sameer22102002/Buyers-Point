import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import RoomIcon from '@mui/icons-material/Room';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex; 
  background-color: #333;
  color: white;
  padding: 20px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
`;

const Desc = styled.p`
  margin-bottom: 20px;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const SocialText = styled.span`
  margin-left: 10px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    color: #f39c12;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }
`;

const ListItemLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>BuyerS - PoinT</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <FooterLink href="https://www.facebook.com/">
            <SocialIcon color="3B5999">
              <FacebookIcon />
            </SocialIcon>
          </FooterLink>
          <FooterLink href="https://www.instagram.com/">
            <SocialIcon color="E4405F">
              <InstagramIcon />
            </SocialIcon>
          </FooterLink>
          <FooterLink href="https://twitter.com/">
            <SocialIcon color="55ACEE">
              <TwitterIcon />
            </SocialIcon>
          </FooterLink>
          <FooterLink href="https://www.pinterest.com/">
            <SocialIcon color="E60023">
              <PinterestIcon />
            </SocialIcon>
          </FooterLink>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Shop Now</Title>
        <List>
          <ListItemLink to="/children-accessories">Children Accessories</ListItemLink>
          <ListItemLink to="/cart">Cart</ListItemLink>
          <ListItemLink to="/men-fashion">Men Fashion</ListItemLink>
          <ListItemLink to="/women-fashion">Women Fashion</ListItemLink>
          <ListItemLink to="/accessories">Accessories</ListItemLink>
          <ListItemLink to="/profile">My Account</ListItemLink>
          <ListItemLink to="/orders">Order Tracking</ListItemLink>
          <ListItemLink to="/wishlist">Wishlist</ListItemLink>
          <ListItemLink to="/terms">Terms</ListItemLink>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{ marginRight: "10px" }} /> 601 South Pawar Lane, Nanede, 431708
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{ marginRight: "10px" }} /> +1 4317084317
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon style={{ marginRight: "10px" }} /> contact@dodo.mailp.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
