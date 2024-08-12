// src/components/Footer.js

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Art Flake</h2>
            <p className="text-gray-400">
              Bringing you the finest art pieces from around the world.
            </p>
          </div>
          {/* Navigation Links */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-500">
          &copy; 2024 Art Flake. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
