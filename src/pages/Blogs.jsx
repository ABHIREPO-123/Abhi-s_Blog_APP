import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  let history = useNavigate()
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/blog/all-blog`);
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      getAllBlogs();
    } else {
      history('/login')
    }
  }, []);
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"}>
        <Box>
          {blogs &&
            blogs.map((blog) => (
              <BlogCard
                key={blog?._id}
                id={blog?._id}
                userID={blog?.user?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                comments={blog?.comments}
                likes={blog?.likes}
                dislikes={blog?.dislikes}
                username={blog?.user?.username}
                time={blog.createdAt}
              />
            ))}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Blogs;
