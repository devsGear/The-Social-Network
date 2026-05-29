import React, { useState, useEffect } from 'react';
import { getFollowing } from '../apicalls/utilityCalls';

function OnlineFriends() {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const data = await getFollowing();
                
        setFollowing(data || []);
      } catch (error) {
        console.error('Failed to fetch following list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  return (
    <div className="bg-gray-50 border-2 border-black p-3 sm:p-4 font-mono">
      <h2 className="text-sm sm:text-base font-bold uppercase border-b-2 border-black pb-2 mb-3 sm:mb-4">Online Friends</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3">
        {loading ? (
          <p className="text-xs">Loading...</p>
        ) : following.length > 0 ? (
          following.map(friend => (
            <div key={friend._id} className="flex items-center pb-2 border-b border-dashed border-black">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black mr-2 sm:mr-3 bg-gray-200 shrink-0 flex items-center justify-center">
                <span className="text-sm sm:text-base font-bold">{friend.name[0]}</span>
              </div>
              <span className="text-sm sm:text-base truncate">{friend.name}</span>
            </div>
          ))
        ) : (
          <p className="text-xs">No friends yet</p>
        )}
      </div>
      
      <div className="mt-3 sm:mt-4 pt-2 border-t border-black">
        <button className="w-full text-xs py-1 sm:py-2 border-2 border-dashed border-black bg-gray-50 hover:bg-gray-200">
          VIEW ALL
        </button>
      </div>
    </div>
  );
}

export default OnlineFriends;