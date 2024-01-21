import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/user/register`, {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success(`User Register Successfully... Email Varification is sent to the ${inputs.email}`);
        navigate("/login");
      }
    } catch (error) {
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
          marginTop={12}
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
            Register
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
              '& .MuiOutlinedInput-root:hover': {
                borderColor: '#810CA8',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#810CA8',
              },
            }}
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
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
            onClick={() => navigate("/login")}
            sx={{
              borderRadius: 12, marginTop: 2,
              color: '#810CA8',
            }}
          >
            Already Registerd ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
