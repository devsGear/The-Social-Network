import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gray-50 border-b-2 border-black p-3 font-mono mb-4 sm:mb-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between">
        {/* Left - App Name */}
        <div className="flex items-center">
          <Link to="/home" className="text-xl uppercase tracking-wider font-bold no-underline text-black">
            <span>The Social Network</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden border-2 border-black p-1 ml-auto mr-2"
        >
          <span className="block w-6 h-0.5 bg-black my-1"></span>
          <span className="block w-6 h-0.5 bg-black my-1"></span>
          <span className="block w-6 h-0.5 bg-black my-1"></span>
        </button>
        
        {/* Desktop Search */}
        <div className="hidden md:block max-w-md w-full mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border-2 border-black font-mono text-base focus:outline-none"
            />
            <button 
              className="absolute right-0 top-0 h-full px-3 border-l border-black bg-gray-200 hover:bg-gray-300"
            >
              Find
            </button>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/explore" className="text-base border-2 px-3 py-2 border-black hover:bg-gray-200 no-underline text-black">
            Explore
          </Link>
          <Link to="/messages" className="text-base border-2 px-3 py-2 border-black hover:bg-gray-200 no-underline text-black">
            Messages
          </Link>
          <Link to="/profile" className="block">
            <div className="w-10 h-10 border-2 border-black bg-gray-300 flex items-center justify-center overflow-hidden">
              <span className="text-base font-bold">P</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden mt-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border-2 border-black font-mono text-base focus:outline-none"
          />
          <button 
            className="absolute right-0 top-0 h-full px-2 border-l border-black bg-gray-200 hover:bg-gray-300"
          >
            Find
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 border-t-2 border-black pt-3">
          <div className="flex flex-col space-y-3">
            <Link to="/explore" className="text-base border-2 px-3 py-2 border-black hover:bg-gray-200 no-underline text-black text-center">
              Explore
            </Link>
            <Link to="/messages" className="text-base border-2 px-3 py-2 border-black hover:bg-gray-200 no-underline text-black text-center">
              Messages
            </Link>
            <Link to="/profile" className="text-base border-2 px-3 py-2 border-black hover:bg-gray-200 no-underline text-black text-center">
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
