import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import tables from "../constants/tables";

//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { AiOutlineClose } from "react-icons/ai";

import AuthContext from "../context/AuthContext";

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
  //context api consumption - declaration
  let { user } = useContext(AuthContext);

  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {}, [user]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <div className="flex relative">
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
                  <li className="text-xl w-full my-2 right-2 cursor-pointer">
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
            </div>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user ? (
                <span>Welcome back, {user.username}</span>
              ) : (
                <span></span>
              )}
            </Typography>
            {user ? (
              <Link to="/logout">
                <Button color="inherit" variant="outlined">
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button color="inherit" variant="outlined">
                  Login
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
