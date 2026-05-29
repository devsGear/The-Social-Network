import User from "../models/user.model.js";

export const addFriend = async (req, res) => {
  const currentUserId = req.userId; // from isAuth middleware
  const { friendId } = req.body;

  try {
    // Check if friendId is provided
    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    // Check if user is trying to add themselves
    if (currentUserId === friendId) {
      return res.status(400).json({ message: "You cannot add yourself as a friend" });
    }

    // Find both users
    const currentUser = await User.findById(currentUserId);
    const friendUser = await User.findById(friendId);

    if (!currentUser || !friendUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already friends
    if (currentUser.following.includes(friendId)) {
      return res.status(400).json({ message: "Already added this friend" });
    }

    // Add friend to current user's following
    currentUser.following.push(friendId);

    // Add current user to friend's followers
    friendUser.followers.push(currentUserId);

    // Save both users
    await currentUser.save();
    await friendUser.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFollowing = async (req, res) => {
  const currentUserId = req.userId;

  try {
    const user = await User.findById(currentUserId).populate({
      path: 'following',
      select: '_id name profilePic email'
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ following: user.following });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
