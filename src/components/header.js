import React, { useContext, useState, useEffect } from "react";

// mui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import tables from "../constants/tables";

const NavbarItem = ({ title, nav_link, handleToggle, classprops }) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const [active, setActive] = useState(false);

  const handleNavSelect = () => {
    navigate(nav_link);
    handleToggle(false);
  };

  useEffect(() => {
    if (pathname.startsWith(nav_link)) setActive(true);
  });

  return (
    <button
      className={`mx-4 cursor-pointer ${classprops} ${
        active && "bg-[#27447e]"
      }`}
      onClick={handleNavSelect}
    >
      {title}
    </button>
  );
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  //context api consumption - declaration
  let { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleProfileMenuOpen = (event) => {
    if (user) setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/logout");
  };

  useEffect(() => {}, [user]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className="cursor-pointer"
            sx={{ mr: 2 }}
            onClick={() => setToggleMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          {toggleMenu && user && (
            <ul
              className="z-10 fixed -top-0 left-0 p-3 w-[20vw] h-screen shadow-2xl list-none
            flex flex-col justify-start items-start rounded-md blue-glassmorphism text-white animate-slide-out overflow-auto"
            >
              <li className="text-xl w-full my-2 right-2 cursor-pointer sticky top-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              {tables.map((item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  nav_link={"/" + item.toLowerCase().split(" ").join("_")}
                  classprops="my-2 text-lg hover:bg-[#27447e] p-2 rounded-lg w-[75%]"
                  handleToggle={() => setToggleMenu()}
                />
              ))}
            </ul>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {user ? <span>Welcome back, {user.username}</span> : <span></span>}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {user && anchorEl && renderMenu}
    </Box>
  );
};

export default Navbar;
