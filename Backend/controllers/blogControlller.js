const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const Blog = require('../models/blogModel');

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Blogs",
      error,
    });
  }
};

//Create Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user).populate('blogs');

    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });

    // Save the blog to the database
    await newBlog.save();

    // // Update the user's blogs array
    exisitingUser.blogs.push(newBlog);

    // // Save the updated user document
    await exisitingUser.save();

    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error: error.message,
    });
  }
};

//Update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};

//SIngle Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    }); popu
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

//GET USER BLOG
exports.userBlogControlller = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};


exports.userCommentsControlller = async (req, res) => {
  const { user, username, text } = req.body;
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).populate('comments.user', 'username');;
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.comments.push({ user, text, username });
    await blog.save();

    return res.status(201).json({ success: true, message: 'Comment added successfully', blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



exports.getCommentsControlller = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Find the blog post by ID and populate comments with user information
    const blog = await Blog.findById(blogId).populate("comments.user", "username");

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Return the comments
    res.json({ comments: blog.comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// likesController
exports.likesControlller = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userLikedIndex = blog.likes.findIndex(like => like.user.equals(req.body.user));
    const userDislikedIndex = blog.dislikes.findIndex(dislike => dislike.user.equals(req.body.user));
    
    if (userLikedIndex !== -1 && userDislikedIndex !== -1) {
      // User already liked, remove like
      blog.likes.splice(userLikedIndex, 1);
      blog.dislikes.splice(userDislikedIndex, 1);
    } else if (userLikedIndex !== 1 && userDislikedIndex !== -1) {
      // User already liked, remove like
      blog.likes.push({ user: req.body.user });
      blog.dislikes.splice(userDislikedIndex, 1);
    } else if (userLikedIndex !== -1 && userDislikedIndex !== 1) {
      // User already liked, remove like
      blog.likes.splice(userLikedIndex, 1);
    } else if (userLikedIndex !== 1 && userDislikedIndex !== 1){
      // User did not like, add like
      blog.likes.push({ user: req.body.user });
    }

    await blog.save();

    res.json({ message: "Like toggled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// dislikesController
exports.dislikesControlller = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userDislikedIndex = blog.dislikes.findIndex(dislike => dislike.user.equals(req.body.user));
    const userLikedIndex = blog.likes.findIndex(like => like.user.equals(req.body.user));
    
    if (userLikedIndex !== -1 && userDislikedIndex !== -1) {
      // User already liked, remove like
      blog.likes.splice(userLikedIndex, 1);
      blog.dislikes.splice(userDislikedIndex, 1);
    } else if (userLikedIndex !== -1 && userDislikedIndex !== 1) {
      // User already liked, remove like
      blog.likes.splice(userLikedIndex, 1);
      blog.dislikes.push({ user: req.body.user });
    } else if (userLikedIndex !== 1 && userDislikedIndex !== -1) {
      // User already liked, remove like
      blog.dislikes.splice(userDislikedIndex, 1);
    } else if (userLikedIndex !== 1 && userDislikedIndex !== 1){
      // User did not like, add like
      blog.dislikes.push({ user: req.body.user });
    }

    await blog.save();

    res.json({ message: "Dislike toggled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
