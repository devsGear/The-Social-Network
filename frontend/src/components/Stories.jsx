import React from 'react';

function Stories() {
  return (
    <div className="border-2 border-black p-3 sm:p-4 bg-gray-50 mb-5">
      <h2 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 border-b-2 border-black pb-2">STORIES</h2>
      <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 sm:pb-3">
        {/* Your Story */}
        <div className="shrink-0 w-16 sm:w-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-gray-200 flex items-center justify-center mb-1 sm:mb-2">
            <span className="text-lg sm:text-xl font-bold">+</span>
          </div>
          <p className="text-xs text-center truncate">Add Story</p>
        </div>
        
        {/* Story 1 */}
        <div className="shrink-0 w-16 sm:w-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-gray-300 flex items-center justify-center mb-1 sm:mb-2">
            <span className="text-lg sm:text-xl font-bold">A</span>
          </div>
          <p className="text-xs text-center truncate">Alice</p>
        </div>
        
        {/* Story 2 */}
        <div className="shrink-0 w-16 sm:w-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-gray-300 flex items-center justify-center mb-1 sm:mb-2">
            <span className="text-lg sm:text-xl font-bold">B</span>
          </div>
          <p className="text-xs text-center truncate">Bob</p>
        </div>
        
        {/* Story 3 */}
        <div className="shrink-0 w-16 sm:w-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-gray-300 flex items-center justify-center mb-1 sm:mb-2">
            <span className="text-lg sm:text-xl font-bold">C</span>
          </div>
          <p className="text-xs text-center truncate">Carol</p>
        </div>
        
        {/* Story 4 */}
        <div className="shrink-0 w-16 sm:w-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-gray-300 flex items-center justify-center mb-1 sm:mb-2">
            <span className="text-lg sm:text-xl font-bold">D</span>
          </div>
          <p className="text-xs text-center truncate">David</p>
        </div>
        
        {/* Story 5 */}
        <div className="shrink-0 w-16 sm:w-20">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black bg-gray-300 flex items-center justify-center mb-1 sm:mb-2">
            <span className="text-lg sm:text-xl font-bold">E</span>
          </div>
          <p className="text-xs text-center truncate">Emma</p>
        </div>
      </div>
    </div>
  );
}

export default Stories;