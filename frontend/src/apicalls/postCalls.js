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
