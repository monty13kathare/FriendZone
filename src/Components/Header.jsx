import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user?.user);
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className=" text-white shadow-lg py-2 border-b border-gray-400">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-3xl font-bold">
            <i className="fa-solid fa-hand-peace"></i> FriendZone
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium  items-center">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/friends" className="hover:text-gray-200">Friends</Link></li>
          <li><Link to="/search" className="hover:text-gray-200">Search</Link></li>
          <li><Link to="/newpost" className="hover:text-gray-200">Create</Link></li>
          <li>
            <Link to="/account">
              <img src={user?.avatar?.url} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-white" />
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-blue-400`}>
        <ul className="space-y-4 text-lg font-medium py-4 px-4">
          <li><Link to="/" className="block hover:bg-blue-600 p-2 rounded">Home</Link></li>
          <li><Link to="/friends" className="block hover:bg-blue-600 p-2 rounded">Friends</Link></li>
          <li><Link to="/search" className="block hover:bg-blue-600 p-2 rounded">Search</Link></li>
          <li><Link to="/newpost" className="block hover:bg-blue-600 p-2 rounded">Create</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
