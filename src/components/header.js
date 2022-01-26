import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  let [userState, setUserState] = useState("loggedOut");

  useEffect(() => {
    if (authTokens != null) {
      setUserState("loggedIn");
    } else {
      setUserState("loggedOut");
    }
  }, [setUserState]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {userState === "loggedIn" ? (
                <span>
                  Welcome back, {jwt_decode(authTokens.access).username}
                </span>
              ) : (
                <span></span>
              )}
            </Typography>
            {userState === "loggedIn" ? (
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
