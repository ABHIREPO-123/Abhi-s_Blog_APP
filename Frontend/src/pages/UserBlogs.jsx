import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Box } from "@mui/material";
import Footer from "../components/Footer";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [name, setName] = useState("")

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`${import.meta.env.VITE_API}/blog/user-blog/${id}`);
      if (data?.success) {
        setName(data?.userBlog?.username);
        setBlogs(data?.userBlog?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} minHeight={"100vh"}>
        <Box >
          {blogs && blogs.length > 0 ?
            blogs.map((blog) => (
              <BlogCard
              key={blog?._id}
              id={blog?._id}
              userID={blog?.user}
              isUser={localStorage.getItem("userId") === blog?.user}
              title={blog?.title}
              description={blog?.description}
              image={blog?.image}
              username={name}
              time={blog.updatedAt}
              comments={blog?.comments}
              likes={blog?.likes}
              dislikes={blog?.dislikes}
              />
            )
            ) :
            <h2 style={{ textAlign: "center", marginTop: "300px" }}>You Havent Created a blog</h2>
          }
        </Box>
        <Footer/>
      </Box>
    </>
  );
};

export default UserBlogs;
