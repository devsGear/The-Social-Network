import React, { useState } from "react";
import { likeComment, deleteComment } from "../apicalls/postCalls";

const FeedComment = ({ comments, postId }) => {
  const [commentLikes, setCommentLikes] = useState(
    comments?.reduce((acc, comment) => {
      acc[comment._id] = false;
      return acc;
    }, {}) || {}
  );
  const [commentsList, setCommentsList] = useState(comments || []);
  const [loading, setLoading] = useState({});

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Just now";

    const date = new Date(dateString);
    const now = new Date();
    const secondsDiff = Math.floor((now - date) / 1000);

    if (secondsDiff < 60) return "Just now";
    if (secondsDiff < 3600)
      return `${Math.floor(secondsDiff / 60)}m ago`;
    if (secondsDiff < 86400)
      return `${Math.floor(secondsDiff / 3600)}h ago`;
    return `${Math.floor(secondsDiff / 86400)}d ago`;
  };

  const handleCommentLike = async (commentId) => {
    const commentKey = `like-${commentId}`;
    setLoading({ ...loading, [commentKey]: true });
    try {
      const result = await likeComment(postId, commentId);
      setCommentLikes({
        ...commentLikes,
        [commentId]: result.liked
      });
      
      // Update comment likes count
      setCommentsList(commentsList.map(c => 
        c._id === commentId ? { ...c, likes: c.likes.length + (result.liked ? 1 : -1) } : c
      ));
    } catch (error) {
      console.error('Error liking comment:', error);
    } finally {
      setLoading({ ...loading, [commentKey]: false });
    }
  };

  const handleDeleteComment = async (commentId) => {
    const commentKey = `delete-${commentId}`;
    setLoading({ ...loading, [commentKey]: true });
    try {
      await deleteComment(postId, commentId);
      setCommentsList(commentsList.filter(c => c._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setLoading({ ...loading, [commentKey]: false });
    }
  };

  if (!commentsList || commentsList.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-2 sm:p-3 border-t border-dashed border-black">
      <p className="text-xs font-bold mb-2">COMMENTS ({commentsList.length})</p>
      <div className="space-y-2">
        {commentsList.map((comment) => (
          <div key={comment._id} className="bg-white border border-gray-300 p-2 text-xs">
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <p className="font-bold">{comment.user?.name || "User"}</p>
                <p className="text-gray-600 text-xs">{getTimeAgo(comment.createdAt)}</p>
              </div>
            </div>

            {/* Comment Text */}
            <p className="text-black mb-2">{comment.text}</p>

            {/* Comment Actions */}
            <div className="flex items-center gap-3 justify-between border-t border-gray-200 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCommentLike(comment._id)}
                  disabled={loading[`like-${comment._id}`]}
                  className="text-xs hover:font-bold disabled:opacity-50"
                >
                  {commentLikes[comment._id] ? "★" : "☆"}
                </button>
                <span className="text-xs font-bold">
                  {comment.likes?.length || 0}
                </span>
              </div>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                disabled={loading[`delete-${comment._id}`]}
                className="text-xs hover:font-bold text-red-600 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedComment;
