import NavBar from '../components/NavBar';
import FeedCard from '../components/FeedCard';
import FriendSuggestions from '../components/FriendSuggestions';
import Stories from '../components/Stories';
import OnlineFriends from '../components/OnlineFriends';

function Home() {
  // Sample post data
  const samplePost = {
    author: { name: "John Doe" },
    content: "This is a sample post for The Social Network. Welcome to our vintage-styled social media platform!",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    likes: 15,
    comments: ["Great!", "Nice post"]
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Stories section */}
          <div className="col-span-1 lg:hidden">
            <Stories />
          </div>
          
          {/* Left sidebar - Friend Suggestions */}
          <div className="lg:col-span-3 order-3 lg:order-1">
            <FriendSuggestions />
          </div>
          
          {/* Main content - Feed */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="mb-4 font-mono">
              {/* Stories section */}
              <div className="hidden lg:block">
                <Stories />
              </div>
              
              {/* Feed Cards */}
              <FeedCard post={samplePost} />
              <FeedCard post={{...samplePost, content: "Another vintage-style post for testing the layout!"}} />
            </div>
          </div>
          
          {/* Right sidebar - Online Friends */}
          <div className="lg:col-span-3 order-2 lg:order-3">
            <OnlineFriends />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home