import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../utils/alerts";

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
// import AlertContext from "../context/AlertContext";

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

  // let { showAlert, alertProps } = useContext(AlertContext);

  // let [showMyAlert, setShowMyAlert] = useState(false);

  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleProfileMenuOpen = (event) => {
    if (user) setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarOpen = () => {
    if (user) setToggleMenu(true);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/logout");
  };

  useEffect(() => {
    // setShowMyAlert(showAlert);
  }, [user]);

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
      disableScrollLock={true}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div>
      {/* {showMyAlert && (
        <Alert
          type={alertProps.type}
          title={alertProps.title}
          message={alertProps.message}
          action={alertProps.action}
        />
      )} */}
      <div>
        <header className="headerWarp" role="banner" style={{ width: "100%" }}>
          <div className="brandInner" style={{ width: "100%" }}>
            <div className="logo">
              <a href="/" title="Home" rel="home" className="site-logo">
                <img
                  style={{ height: "7rem", width: "7rem" }}
                  src="https://rvce.edu.in/sites/default/files/logo_0.png"
                  alt="Home"
                />
              </a>
            </div>
            <div className="brandName">
              <div className="l-region l-region--branding">
                <div
                  id="block-block-28"
                  className="block block--block block--block-28"
                >
                  <div className="block__content">
                    <h3 className="rtecenter">
                      <span style={{ fontSize: "16px" }}>
                        Rashtreeya Sikshana Samithi Trust
                      </span>
                    </h3>
                    <h1 className="rtecenter">
                      <span style={{ fontSize: "26px" }}>
                        <a href="/" title="Home">
                          R V College of Engineering
                        </a>
                      </span>
                    </h1>
                    <h6 className="rtecenter">
                      <span style={{ fontSize: "12px" }}>
                        Autonomous Institution affiliated to Visvesvaraya
                        Technological University, Belagavi
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          style={{
            display: "inline-flex",
            float: "right",
            padding: "15px",
            backgroundColor: "#27447e",
            width: "100%",
            marginBottom: "0px",
          }}
        />
      </div>
      <div>
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
                onClick={handleSidebarOpen}
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
                {user ? (
                  <span>Welcome back, {user.username}</span>
                ) : (
                  <span></span>
                )}
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
      </div>
    </div>
  );
};

export default Navbar;
