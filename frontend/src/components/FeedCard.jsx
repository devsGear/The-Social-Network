import React, { useState } from "react";
import FeedComment from "./FeedComment";
import { likePost, addComment } from "../apicalls/postCalls";

const FeedCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);
  const [loading, setLoading] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);

  const handleLike = async () => {
    setLoading(true);
    try {
      const result = await likePost(post._id);
      setLiked(result.liked);
      setLikeCount(result.likeCount);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    
    setCommentLoading(true);
    try {
      const newComment = await addComment(post._id, commentText);
      setComments([...comments, newComment]);
      setCommentText("");
      setShowCommentForm(false);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Just now";

    const date = new Date(dateString);
    const now = new Date();
    const secondsDiff = Math.floor((now - date) / 1000);

    if (secondsDiff < 60) return "Just now";
    if (secondsDiff < 3600)
      return `${Math.floor(secondsDiff / 60)} minutes ago`;
    if (secondsDiff < 86400)
      return `${Math.floor(secondsDiff / 3600)} hours ago`;
    return `${Math.floor(secondsDiff / 86400)} days ago`;
  };

  return (
    <div className="bg-gray-50 border-2 border-black mb-5 font-mono w-full">
      <div className="flex items-center p-2 sm:p-3 border-b-2 border-black">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black mr-2 sm:mr-3 flex items-center justify-center bg-gray-200 shrink-0">
          {post?.author?.profilePic ? (
            <img
              src={post.author.profilePic}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg sm:text-xl font-bold">
              {(post?.author?.name || "U").charAt(0)}
            </span>
          )}
        </div>
        {/* User Info */}
        <div className="overflow-hidden">
          <h4 className="font-bold text-black text-sm sm:text-base truncate">
            {post?.author?.name || "User Name"}
          </h4>
          <p className="text-xs sm:text-sm italic">
            {post?.createdAt ? getTimeAgo(post.createdAt) : "Just now"}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-3 sm:p-4 border-b border-dashed border-black">
        <p className="text-black mb-3 text-sm sm:text-base leading-relaxed">
          {post?.text || "No content"}
        </p>

        {/* Post Image */}
        {post?.image && (
          <div className="mb-3 border-2 border-black p-1 sm:p-2">
            <img
              src={post.image}
              alt="Post"
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-between text-xs sm:text-sm p-2 bg-gray-100 border-b border-black">
        <span className="font-bold">{likeCount} likes</span>
        <span className="font-bold">{comments?.length || 0} comments</span>
      </div>

      {/* Comments Section */}
      {comments && comments.length > 0 && (
        <FeedComment comments={comments} postId={post._id} />
      )}

      {/* Action Buttons */}
      <div className="flex border-t border-black">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex-1 py-1 sm:py-2 text-xs sm:text-sm font-bold disabled:opacity-50 ${
            liked ? "bg-gray-300" : "bg-gray-50"
          } border-r border-black hover:bg-gray-200`}
        >
          {liked ? "★" : "☆"}
        </button>
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="flex-1 py-1 sm:py-2 text-xs sm:text-sm font-bold bg-gray-50 border-r border-black hover:bg-gray-200"
        >
          CMT
        </button>
        <button className="flex-1 py-1 sm:py-2 text-xs sm:text-sm font-bold bg-gray-50 hover:bg-gray-200">
          SHR
        </button>
      </div>

      {/* Comment Form */}
      {showCommentForm && (
        <div className="p-3 sm:p-4 border-t border-black bg-gray-100">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border-2 border-black text-xs sm:text-sm font-mono resize-none focus:outline-none focus:bg-white"
            rows="3"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddComment}
              disabled={commentLoading || !commentText.trim()}
              className="flex-1 py-2 bg-black text-white text-xs font-bold disabled:opacity-50 hover:bg-gray-800"
            >
              {commentLoading ? "Posting..." : "Post"}
            </button>
            <button
              onClick={() => {
                setShowCommentForm(false);
                setCommentText("");
              }}
              className="flex-1 py-2 bg-gray-300 text-black text-xs font-bold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
