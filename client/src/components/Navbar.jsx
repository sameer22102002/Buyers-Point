import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { changeMode } from "../redux/apiCalls";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchInput from "./SearchInput";

const darkColors = {
  primary: "#fff",
  secondary: "#443C68",
  tertiary: "#393053",
  quaternary: "#18122B",
  textPrimary: "#18191A",
};

const lightColors = {
  primary: "#3A3B3C",
  secondary: "#3A3B3C",
  tertiary: "#635985",
  quaternary: "#fff",
  textPrimary: "#fff",
};

const Container = styled.div`
  height: 60px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.textPrimary};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;


const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: ${({ theme }) => theme.textPrimary};
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  background-color: ${({ theme }) => theme.secondary};
`;

const DropdownItem = styled.div`
  &:hover {
    background-color: lightgray;
  }
  padding: 7px;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};
`;

const LogoutMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  color: ${({ theme }) => theme.textPrimary};
`;

const LogoutText = styled.span`
  margin-left: 5px;
`;

const ProfileMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
  color: ${({ theme }) => theme.textPrimary};
`;

const ProfileText = styled.span`
  margin-left: 5px;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const p = useSelector((state) => state.user.cartQuantity);
  const isLogged = useSelector((state) => state.user.currentUser);
  const [showDropdown, setShowDropdown] = useState(false);
  const { mode } = useSelector((state) => state.darkMode);
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    logout(dispatch);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

 

  const toggleDark = () => {
    changeMode(dispatch);
  };

  return (
    <Container theme={mode ? lightColors : darkColors}>
      <Wrapper>
        <Left>
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={toggleDark}
            css={css`
              color: ${({ theme }) => theme.textPrimary};
            `}
          >
            {mode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          
          <SearchInput />
        </Left>
        <Center>
          <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
            <Logo>BuyerSPoinT</Logo>
          </Link>
        </Center>
        <Right>
          {isLogged && (
            <MenuItem>
              {" "}
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={"/wishlist"}
              >
                Wishlist
              </Link>{" "}
            </MenuItem>
          )}
          {isLogged && (
            <MenuItem>
              {" "}
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to={"/orders"}
              >
                My Orders
              </Link>{" "}
            </MenuItem>
          )}
          {!isLogged && (
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={"/register"}
            >
              <MenuItem>REGISTER</MenuItem>
            </Link>
          )}
          {!isLogged && (
            <Link
              style={{ color: "inherit", textDecoration: "none" }}
              to={"/login"}
            >
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          )}
          {isLogged && (
            <Link to={"/cart"}>
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </MenuItem>
            </Link>
          )}
          {isLogged && (
            <Dropdown>
              <MenuItem onClick={toggleDropdown}>
                <AccountCircleIcon />
              </MenuItem>
              {showDropdown && (
                <DropdownContent>
                  <Link
                    to={"/"}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <DropdownItem>
                      <ProfileMenuItem>
                        <HomeIcon />
                        <ProfileText>Home</ProfileText>
                      </ProfileMenuItem>
                    </DropdownItem>
                  </Link>
                  <Link
                    to={"/profile"}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <DropdownItem>
                      <ProfileMenuItem>
                        <ManageAccountsIcon />
                        <ProfileText>Profile</ProfileText>
                      </ProfileMenuItem>
                    </DropdownItem>
                  </Link>
                  <DropdownItem>
                    <LogoutMenuItem onClick={logoutHandler}>
                      <LogoutIcon />
                      <LogoutText>Logout</LogoutText>
                    </LogoutMenuItem>
                  </DropdownItem>
                    <DropdownItem>
                  <Link to={"/customer-care"} style={{color:"inherit" ,textDecoration:"none"}}>
                      <LogoutMenuItem>
                        <HelpOutlineIcon />
                        <LogoutText>Help</LogoutText>
                      </LogoutMenuItem>
                  </Link>
                    </DropdownItem>
                </DropdownContent>
              )}
            </Dropdown>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
