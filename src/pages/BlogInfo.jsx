import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import axios from 'axios';
import { Box } from '@mui/material';


const BlogInfo = () => {
    const location = useLocation();
    const { state } = location;
    const { id, title, description, image} = state;
    const currentUser = localStorage.getItem("currentUser");
    const userId = localStorage.getItem("userId");

    let likesLength = 0;
    let dislikesLength = 0;
    let isLikePresent = false
    let isDislikePresent = false
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const [likesCount, setLikesCount] = useState(likesLength);
    const [dislikesCount, setDislikesCount] = useState(dislikesLength);
    const [isLiked, setIsLiked] = useState(isLikePresent);
    const [isDisliked, setIsDisliked] = useState(isDislikePresent);

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if (!commentText.trim()) {
            console.warn('Comment text is empty. Not submitting empty comment.');
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/blog/add-comment/${id}`, {
                user: userId,
                username: currentUser,
                text: commentText,
            });

            // Handle the response, update state, or perform additional actions as needed

            const data = {
                user: userId,
                username: currentUser,
                text: commentText,
                createdAt: new Date().toISOString(),
            }
            setComments([...comments, data]);
            setCommentText('');
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Handle the error
        }
    };

    const handleLike = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API}/blog/like/${id}`, {
                user: userId,
            });
            if (isLiked) {
                // If already liked, make a request to unlike

                // Update local state
                setLikesCount(likesCount - 1);
            } else {
                // If not liked, make a request to like

                // Update local state
                setLikesCount(likesCount + 1);
            }

            // Toggle the isLiked state
            setIsLiked(!isLiked);

            // If the post was disliked, update dislike count and reset isDisliked state
            if (isDisliked) {
                setDislikesCount(dislikesCount - 1);
                setIsDisliked(false);
            }
        } catch (error) {
            console.error('Error liking post:', error);
            // Handle the error
        }
    };


    const handleDislike = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API}/blog/dislike/${id}`, {
                user: userId,
            });
            if (isDisliked) {
                // If already disliked, remove the dislike
                setDislikesCount(dislikesCount - 1);
            } else {
                // If not disliked, add the dislike
                setDislikesCount(dislikesCount + 1);
            }

            // Toggle the dislike state
            setIsDisliked(!isDisliked);

            // If the post was liked, update like count and reset isLiked state
            if (isLiked) {
                setLikesCount(likesCount - 1);
                setIsLiked(false);
            }
        } catch (error) {
            console.error('Error disliking post:', error);
            // Handle the error
        }
    };



    const getAllComments = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API}/blog/get-comments/${id}`);
            if (data.comments.length > 0) {
                setComments(data.comments);
            }
        } catch (error) {
            console.log(error);
        }
    };

    let listOfObjects = []
    function findBlogByBlogID(blogID) {
        return listOfObjects.find(blog => blog._id == blogID);
    }
    const getLikesDislikes = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/blog/all-blog`);
            listOfObjects = data.blogs;
            const likes = findBlogByBlogID(id).likes;
            setLikesCount(likes.length);
            const dislikes = findBlogByBlogID(id).dislikes;
            setDislikesCount(dislikes.length);
            if (likes.length > 0 || dislikes.length > 0) {
                setIsLiked(likes.some(like => Object.values(like).includes(userId)));
                setIsDisliked(dislikes.some(dislike => Object.values(dislike).includes(userId)));
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllComments();
        getLikesDislikes();
    }, []);

    return (
        <Card>
            <CardMedia
                component="img"
                image={image}
                height={500}
                alt="Blog Image"
            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
            />
            <CardContent sx={{
                mx: 'auto',
                width: '85%',
                '@media (max-width: 600px)': {
                    width: '90%', // Set width to 300px for screens less than 470px
                },
                '@media (max-width: 500px)': {
                    width: '95%', // Set width to 300px for screens less than 470px
                },
            }}>
                <Typography marginTop={2} textAlign={'justify'} variant="h5" component="div">
                    {title}
                </Typography>
                <Typography marginTop={2} textAlign={'justify'} variant="body2" color="text.secondary">
                    {description}
                </Typography>


                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <IconButton aria-label="like" onClick={handleLike}>
                        <ThumbUpIcon color={isLiked ? 'primary' : 'default'} />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                        {likesCount} Likes
                    </Typography>
                    <IconButton aria-label="dislike" onClick={handleDislike}>
                        <ThumbDownIcon color={isDisliked ? 'primary' : 'default'} />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                        {dislikesCount} Dislikes
                    </Typography>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <IconButton aria-label="comments">
                        <CommentIcon />
                    </IconButton>
                    <Typography variant="caption" color="text.secondary">
                        {comments ? comments.length : 0} Comments
                    </Typography>
                </div>


                {/* Comment Form */}
                <TextField
                    label="Write a comment"
                    spellCheck="false"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    id='text'
                    name='text'
                    value={commentText}
                    onChange={handleCommentChange}
                    sx={{ mt: '16px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    sx={{ mt: '8px' }}
                    disabled={commentText.length === 0}
                >
                    Comment
                </Button>
                {comments && comments.length > 0 && (
                    <div style={{ marginTop: '16px' }}>
                        <Typography variant="h6" gutterBottom>
                            Comments:
                        </Typography>
                        {comments.map((comment, index) => (
                            <div key={index} style={{ padding: "10px" }}>
                                <div style={{ display: "flex" }}>

                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {(comment.username || 'Default').slice(0, 2).toUpperCase()}
                                    </Avatar>

                                    {/* Display additional comment information if needed */}
                                    <div>
                                        <Box display={"flex"} flexDirection={'row'} sx={{
                                            '@media (max-width: 350px)': {
                                                flexDirection: "column", // Change direction to column for screens less than 350px
                                            },
                                        }}>
                                            <Typography marginLeft={2} variant="caption">
                                                <strong>@{comment.username}</strong>
                                            </Typography>
                                            <Typography marginLeft={2} variant="caption">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </Typography>
                                        </Box>
                                        <Typography marginLeft={2} sx={{ pt: "2px", fontSize: "0.8em" }} variant="body1">{comment.text}</Typography>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default BlogInfo;

