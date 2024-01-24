import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/user/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      if (!data.success && data.error==="regErr") {
        toast.error("You are not Registered. ");
      } else if(!data.success && data.error==="emailErr"){
        toast.error("Verify Your email ID");
      }
      else {
        localStorage.setItem("userId", data?.user._id);
        localStorage.setItem("currentUser", data?.user.username);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Email or Password");
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={8}
        >
          <Typography
            variant="h5"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            sx={{
              mx: "auto",  
              my: 1,  
              // width: '300px',  
              '& input': {
                height: '12px',  
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '21px', 
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#810CA8', 
              },
            }}
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            sx={{
              mx: "auto",  
              my: 1,  
              // width: '300px',  
              '& input': {
                height: '12px',  
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '21px', 
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#810CA8', 
              },
            }}
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{
              borderRadius: 12, marginTop: 2,
              backgroundColor: '#810CA8',
              ":hover": {
                backgroundColor: "#2D033B",
              },
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{
              borderRadius: 12, marginTop: 2,
              color: '#810CA8',

            }}
          >
            Not a user ? Please Register
          </Button>
          <Button
            onClick={() => navigate("/reset-password")}
            sx={{
              borderRadius: 12,
              color: '#810CA8',

            }}
          >
            Reset Password
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
