import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState([]); // State to store artworks
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Function to fetch artworks
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/artworks"); // Replace with your backend URL
        setArtworks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch artworks");
        setLoading(false);
      }
    };

    fetchArtworks(); // Fetch artworks when component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetch fails
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Artworks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{artwork.title}</h3>
                <p>{artwork.description}</p>
                <p>${artwork.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtworks;
