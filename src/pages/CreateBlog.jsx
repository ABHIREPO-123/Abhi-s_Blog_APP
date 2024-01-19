import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/blog/create-blog`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputStyles = {
    mx: 'auto',
    my: 1,
    width: '100%', // Use 100% width for responsiveness
    '& input': {
      height: '12px',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '11px',
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: "100%", // Adjust width to 100%
            maxWidth: "500px", // Limit the maximum width
            border: 0,
            borderRadius: 8,
            padding: 3,
            margin: "auto",
            boxShadow: "5px 6px 20px 5px #ccc",
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <Typography
            borderRadius={1}
            variant="h5"
            textAlign={"center"}
            fontWeight="bold"
            padding={1}
            color="black"
          >
            Create A Post
          </Typography>

          <TextField
            sx={inputStyles}
            multiline
            spellCheck="false"
            rows={3}
            label="Title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            variant="outlined"
            required
          />

          <TextField
            sx={inputStyles}
            multiline
            rows={6}
            spellCheck="false"
            label="Description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            variant="outlined"
            required
          />

          <TextField
            sx={inputStyles}
            multiline
            rows={2}
            spellCheck="false"
            label="Image URL"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              borderRadius: '25px',
              mx: "auto",
              width: "100px",
              mt: 2,
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: '#810CA8',
              ":hover": {
                backgroundColor: "#2D033B",
              },
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
