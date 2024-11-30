import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title */}
        <h1 className="text-lg font-bold">{title}</h1>
        
        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/add" className="hover:underline">
            Add User
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
