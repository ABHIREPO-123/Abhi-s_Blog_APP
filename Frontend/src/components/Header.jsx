import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import MenuIcon from '@mui/icons-material/Menu';
const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState(0);

  const [show, setShow] = React.useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  const theme = useTheme();
  const isSmallerScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const aboutClassName = `glow-link${location.pathname === '/about' ? ' active' : ''}`;
  const loginClassName = `glow-link${location.pathname === '/login' ? ' active' : ''}`;
  const registerClassName = `glow-link${location.pathname === '/register' ? ' active' : ''}`;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#810CA8' }}>
        <Toolbar>
          <Typography variant="h6" marginRight={1}>Abhi's Blogs</Typography>

          {isLogin && (
            <Box>
              {isSmallerScreen ? (
                // Render the toggle button for smaller screens
                <Box width={"70vw"} display={"flex"} justifyContent={"flex-end"}>
                  <IconButton onClick={handleClick} color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                </Box>
              ) : (
                // Render other content for larger screens
                <Tabs
                  size="small"
                  textColor="inherit"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                  variant="scrollable"
                  allowScrollButtonsMobile
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  sx={{
                    "& .MuiTabs-indicator": { backgroundColor: 'white' },
                    width: '100%', // Default width for larger screens
                  }}
                >
                  <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                  <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                  <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
                </Tabs>
              )}
            </Box>
          )}
          <Box display={"flex"} sx={{ ml: 'auto', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {!isLogin && (
              <>
                <Button
                  sx={{ color: "white" }}
                  size="small"
                  LinkComponent={Link}
                  to="/about"
                  className={aboutClassName}

                >
                  ABOUT
                </Button>
                <Button
                  sx={{ color: "white" }}
                  size="small"
                  LinkComponent={Link}
                  to="/login"
                  className={loginClassName}

                >
                  Login
                </Button>
                <Button
                  sx={{ color: "white" }}
                  size="small"
                  LinkComponent={Link}
                  to="/register"
                  className={registerClassName}

                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (!isSmallerScreen ?
              <>
                <Button
                  sx={{ ml: 'auto', color: "white" }}
                  size="small"
                  LinkComponent={Link}
                  to="/about"
                  className={aboutClassName}
                >
                  ABOUT
                </Button>
                <Button size="small" onClick={handleLogout} sx={{ ml: 'auto', color: "white" }}>
                  Logout
                </Button>
              </> : null
            )}
          </Box>
        </Toolbar>
        {/* {show? <Typography variant="h6" marginRight={"auto"}>Abhi's Blogs</Typography>: null } */}

        {show && isSmallerScreen && isLogin ? (
          // Render other content for larger screens
          <Toolbar>

            <Tabs
              size="small"
              textColor="inherit"
              orientation="vertical"
              value={value}
              onChange={(e, val) => setValue(val)}
              variant="scrollable"
              allowScrollButtonsMobile
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{
                "& .MuiTabs-indicator": { background: "none" },
                width: '100%', // Default width for larger screens
              }}
            >
              <Tab sx={{ marginLeft: 'auto', marginRight: 'auto' }} label="Blogs" LinkComponent={Link} to="/blogs" />
              <Tab sx={{ marginLeft: 'auto', marginRight: 'auto' }} label="My Blogs" LinkComponent={Link} to="/my-blogs" />
              <Tab sx={{ marginLeft: 'auto', marginRight: 'auto' }} label="Create Blog" LinkComponent={Link} to="/create-blog" />
              <Button
                sx={{ ml: 'auto', mr: 'auto', my: "5px", color: "white", border: "2px solid white", borderRadius: "20px" }}
                size="small"
                LinkComponent={Link}
                to="/about"
                className={aboutClassName}
              >
                ABOUT
              </Button>
              <Button size="small" onClick={handleLogout} sx={{ ml: 'auto', mr: 'auto', my: "5px", color: "white", border: "2px solid white", borderRadius: "20px" }}>
                Logout
              </Button>
            </Tabs>
          </Toolbar>
        ) : null}
      </AppBar>
    </>
  );
};

export default Header;
