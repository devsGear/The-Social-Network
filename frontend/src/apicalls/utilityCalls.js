import axios from 'axios';
import { API_BASE_URL } from './config';

export const addFriend = async (friendId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/utility/add-friend`,
      { friendId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error adding friend' };
  }
};

export const getFollowing = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/utility/following`,
      { withCredentials: true }
    );
    return response.data.following;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching following list' };
  }
};
