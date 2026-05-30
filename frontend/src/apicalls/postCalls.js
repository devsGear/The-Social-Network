import axios from 'axios';
import { API_BASE_URL } from './config';

export const getFollowingPosts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/post/following`,
      { withCredentials: true }
    );
    return response.data.posts;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching posts' };
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/post/all`,
      { withCredentials: true }
    );
    return response.data.posts;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching posts' };
  }
};

export const uploadPostImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await axios.post(
      `${API_BASE_URL}/api/post/upload-post-img`,
      formData,
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data.imageUrl;
  } catch (error) {
    throw error.response?.data || { message: 'Error uploading image' };
  }
};

export const createPost = async (text, image) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/post/create`,
      { text, image },
      { withCredentials: true }
    );
    return response.data.post;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating post' };
  }
};

export const getUserPosts = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/post/user`,
      { withCredentials: true }
    );
    return response.data.posts;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching user posts' };
  }
};

export const likePost = async (postId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/post/like/${postId}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error liking post' };
  }
};

export const addComment = async (postId, text) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/post/comment/${postId}`,
      { text },
      { withCredentials: true }
    );
    return response.data.comment;
  } catch (error) {
    throw error.response?.data || { message: 'Error adding comment' };
  }
};

export const likeComment = async (postId, commentId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/post/like-comment/${postId}/${commentId}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error liking comment' };
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/post/comment/${postId}/${commentId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting comment' };
  }
};
