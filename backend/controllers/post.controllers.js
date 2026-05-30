import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'author',
        select: '_id name profilePic'
      })
      .populate({
        path: 'likes',
        select: '_id'
      })
      .populate({
        path: 'comments.user',
        select: '_id name profilePic'
      })
      .populate({
        path: 'comments.likes',
        select: '_id'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchFollowingPosts = async (req, res) => {
  const userId = req.userId;

  try {
    // Get current user's following list
    const currentUser = await User.findById(userId).select("following");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch posts from users that current user is following
    const posts = await Post.find({ author: { $in: currentUser.following } })
      .populate({
        path: 'author',
        select: '_id name profilePic'
      })
      .populate({
        path: 'likes',
        select: '_id'
      })
      .populate({
        path: 'comments.user',
        select: '_id name profilePic'
      })
      .populate({
        path: 'comments.likes',
        select: '_id'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createPost = async (req, res) => {
  const userId = req.userId;
  const { text, image } = req.body;

  try {
    // Check if at least text or image is provided
    if (!text && !image) {
      return res.status(400).json({ message: "Post must have text or image" });
    }

    // Create new post
    const newPost = new Post({
      author: userId,
      text: text || "",
      image: image || ""
    });

    // Save post
    await newPost.save();

    // Populate author details
    await newPost.populate({
      path: 'author',
      select: '_id name profilePic'
    });

    res.status(201).json({ 
      message: "Post created successfully",
      post: newPost 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.userId;

  try {
    const posts = await Post.find({ author: userId })
      .populate({
        path: 'author',
        select: '_id name profilePic'
      })
      .populate({
        path: 'likes',
        select: '_id'
      })
      .populate({
        path: 'comments.user',
        select: '_id name profilePic'
      })
      .populate({
        path: 'comments.likes',
        select: '_id'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "post-pictures",
      }
    );

    res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user already liked the post
    const userLiked = post.likes.includes(userId);

    if (userLiked) {
      // Unlike the post
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Like the post
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({ 
      message: userLiked ? "Post unliked" : "Post liked",
      liked: !userLiked,
      likeCount: post.likes.length
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addComment = async (req, res) => {
  const userId = req.userId;
  const { postId } = req.params;
  const { text } = req.body;

  try {
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: userId,
      text: text.trim(),
      likes: [],
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    // Populate the new comment with user details
    await post.populate({
      path: 'comments.user',
      select: '_id name profilePic'
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const likeComment = async (req, res) => {
  const userId = req.userId;
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user already liked the comment
    const userLiked = comment.likes.includes(userId);

    if (userLiked) {
      // Unlike the comment
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
      // Like the comment
      comment.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: userLiked ? "Comment unliked" : "Comment liked",
      liked: !userLiked,
      likeCount: comment.likes.length
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  const userId = req.userId;
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is the comment author
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    post.comments.id(commentId).deleteOne();
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};