import React from 'react';

function FriendSuggestions() {
  return (
    <div className="bg-gray-50 border-2 border-black p-3 sm:p-4 mb-4 sm:mb-6 font-mono">
      <h2 className="text-sm sm:text-base font-bold uppercase border-b-2 border-black pb-2 mb-3 sm:mb-4">People You May Know</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
        
        <div className="pb-3 border-b border-dashed border-black">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black mr-2 sm:mr-3 bg-gray-200 shrink-0 flex items-center justify-center">
              <span className="text-sm sm:text-base font-bold">S</span>
            </div>
            <span className="text-sm sm:text-base font-bold truncate">Sarah Parker</span>
          </div>
          <div className="flex justify-between mt-2 gap-2">
            <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
              ADD FRIEND
            </button>
            <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
              IGNORE
            </button>
          </div>
        </div>
        
        <div className="pb-3 border-b border-dashed border-black">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black mr-2 sm:mr-3 bg-gray-200 shrink-0 flex items-center justify-center">
              <span className="text-sm sm:text-base font-bold">M</span>
            </div>
            <span className="text-sm sm:text-base font-bold truncate">Michael Chen</span>
          </div>
          <div className="flex justify-between mt-2 gap-2">
            <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
              ADD FRIEND
            </button>
            <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
              IGNORE
            </button>
          </div>
        </div>
        
        <div className="pb-3 sm:mb-0">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black mr-2 sm:mr-3 bg-gray-200 shrink-0 flex items-center justify-center">
              <span className="text-sm sm:text-base font-bold">J</span>
            </div>
            <span className="text-sm sm:text-base font-bold truncate">Jessica Lee</span>
          </div>
          <div className="flex justify-between mt-2 gap-2">
            <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
              ADD FRIEND
            </button>
            <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
              IGNORE
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4 pt-2 border-t border-black">
        <button className="w-full text-xs py-1 sm:py-2 border-2 border-dashed border-black bg-gray-50 hover:bg-gray-200">
          SHOW MORE
        </button>
      </div>
    </div>
  );
}

export default FriendSuggestions;