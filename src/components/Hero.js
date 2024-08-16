import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import starryNight from "../images/starry-night.jpg";

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleExploreClick = () => {
    navigate("/shop"); // Navigate to the /shop route
  };

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      <img
        src={starryNight} // Your image path
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-6">
        <h1 className="text-5xl font-bold">Welcome to Art Flake</h1>
        <p className="mt-4 text-xl">
          Explore and purchase exquisite artworks from talented artists.
        </p>
        <button
          className="mt-6 px-6 py-3 bg-indigo-600 rounded-full hover:bg-indigo-700"
          onClick={handleExploreClick} // Add onClick event
        >
          Explore Artworks
        </button>
      </div>
    </div>
  );
};

export default Hero;
