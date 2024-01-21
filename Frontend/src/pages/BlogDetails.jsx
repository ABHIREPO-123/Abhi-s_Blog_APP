import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API}/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image
      });
      if (data?.success) {
        toast.success("Blog Updated");
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
    <v>
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
            Update A Pots
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
            ssx={inputStyles}
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
            color="warning"
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
            UPDATE
          </Button>
        </Box>
      </form>
    </v>
  );
};

export default BlogDetails;
