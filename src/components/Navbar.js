import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="text-white hover:text-white">
            Art Flake
          </Link>
        </div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/" className="text-white hover:text-gray-300">
            Arts
          </a>
          <a href="/" className="text-white hover:text-gray-300">
            Artists
          </a>
          <a href="/" className="text-white hover:text-gray-300">
            Exhibitions
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
