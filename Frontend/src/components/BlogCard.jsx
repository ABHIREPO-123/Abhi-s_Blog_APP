import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default function BlogCard({
  title,
  description,
  image,
  comments,
  likes,
  dislikes,
  username,
  time,
  id,
  isUser,
  userID,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  // https://abhis-blogs.onrender.com/blog/all-blog
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API}/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const linkData = { id: id, title: title, description: description, image: image };
  return (
    <Card
      sx={{
        borderRadius: "8px",
        width: "50%",
        margin: "auto",
        mt: 2,
        // paddingX: 6,
        // paddingY: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
        '@media (max-width: 1280px)': {
          width: '60%', // Set width to 300px for screens less than 470px
        },
        '@media (max-width: 1024px)': {
          width: '65%', // Set width to 300px for screens less than 470px
        },
        '@media (max-width: 540px)': {
          width: '80%', // Set width to 300px for screens less than 470px
        },
        '@media (max-width: 412px)': {
          width: '90%', // Set width to 300px for screens less than 470px
        },
      }}
    >
      <CardHeader data-aos="fade-right"
        sx={{ marginX: 1 }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {(username || 'Default').slice(0, 2).toUpperCase()}
          </Avatar>
        }
        title={username}
        subheader={new Date(time).toLocaleString()}

        action={isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
      />
      {/* sx={{ borderRadius: '10px' }} */}
      <CardMedia data-aos="zoom-in-up" component="img" height="300" image={image} alt="Paella dish" />
      <CardContent sx={{ marginX: 1 }}>
        <Typography textAlign={'justify'} variant="h6" color="text.secondary" component={Link} to={`/bloginfo/${id}`} state={linkData}
          sx={{
            textDecoration: 'none', // Remove default text decoration
            '&:hover': {
              textDecoration: 'underline', // Add underline on hover
            },
          }}
        >
          Title : {title.split(" ").splice(0, 10).join(" ")}....
        </Typography>
        <Typography data-aos="fade-up" textAlign={'justify'} variant="body2" color="text.secondary">
          Description : {description.split(" ").splice(0, 40).join(" ")}....
        </Typography>

      </CardContent>
      <CardContent>
        <IconButton aria-label="like">
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {likes.length}
        </Typography>
        <IconButton sx={{marginLeft:'24px'}} aria-label="dislike">
          <ThumbDownIcon />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {dislikes.length}
        </Typography>
        <IconButton sx={{marginLeft:'24px'}} aria-label="comments">
          <CommentIcon />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {comments.length}
        </Typography>
      </CardContent>
    </Card>
  );
}
