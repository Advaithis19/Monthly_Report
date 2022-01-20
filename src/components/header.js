import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {authTokens ? (
                <span>
                  Welcome back, {jwt_decode(authTokens.access).username}
                </span>
              ) : (
                <span></span>
              )}
            </Typography>
            {authTokens ? (
              <Link to="/logout">
                <Button color="inherit">Logout</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
