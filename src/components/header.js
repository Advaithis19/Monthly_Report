import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import AuthContext from "../context/AuthContext";

const Navbar = () => {
  //context api consumption - declaration
  let { user } = useContext(AuthContext);

  useEffect(() => {}, [user]);

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
