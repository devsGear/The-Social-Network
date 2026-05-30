import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FeedCard from '../components/FeedCard';
import FriendSuggestions from '../components/FriendSuggestions';
import Stories from '../components/Stories';
import OnlineFriends from '../components/OnlineFriends';
import { getUserPosts, getFollowingPosts } from '../apicalls/postCalls';

function Home({user}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [userPostsData, followingPostsData] = await Promise.all([
          getUserPosts(),
          getFollowingPosts()
        ]);

        const allPosts = [...(userPostsData || []), ...(followingPostsData || [])];
        
        const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar name={user.name} />
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Stories section */}
          <div className="col-span-1 lg:hidden">
            <Stories />
          </div>
          
          <div className="lg:col-span-3 order-3 lg:order-1">
            <FriendSuggestions />
          </div>
          
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="mb-4 font-mono">
              <div className="hidden lg:block">
                <Stories />
              </div>
              
              {loading ? (
                <p className="text-center py-8">Loading posts...</p>
              ) : posts.length > 0 ? (
                posts.map(post => (
                  <FeedCard key={post._id} post={post} />
                ))
              ) : (
                <p className="text-center py-8">No posts yet. Follow more people to see their posts!</p>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-3 order-2 lg:order-3">
            <OnlineFriends />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;