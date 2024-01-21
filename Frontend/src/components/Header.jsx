import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState(0);

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
  const aboutClassName = `glow-link${location.pathname === '/about' ? ' active' : ''}`;
  const loginClassName = `glow-link${location.pathname === '/login' ? ' active' : ''}`;
  const registerClassName = `glow-link${location.pathname === '/register' ? ' active' : ''}`;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#810CA8' }}>
        <Toolbar>
          <Typography variant="h6" marginRight={1}>Abhi's Blogs</Typography>

          {isLogin && (
            <Box display={"flex"} alignItems="center">
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
                  '@media (max-width: 470px)': {
                    width: '200px', // Set width to 300px for screens less than 470px
                  },
                  '@media (max-width: 370px)': {
                    width: '120px', // Set width to 300px for screens less than 470px
                  },
                  '@media (max-width: 290px)': {
                    width: '120px', // Set width to 300px for screens less than 470px
                  },
                }}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
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
            {isLogin && (
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
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
