import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

const Shop = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/artworks");
        setArtworks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch artworks");
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleBuyNow = async (artworkId) => {
    try {
      const cartRequest = {
        userId: user.id, // Replace with actual user ID
        artworkId: artworkId,
      };

      const response = await axios.post(
        "http://localhost:8080/carts/add",
        cartRequest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Artwork added to cart successfully!");
        setArtworks((prevArtworks) =>
          prevArtworks.filter((art) => art.id !== artworkId)
        );
      }
    } catch (err) {
      console.error("Failed to add artwork to cart", err);
      alert("Failed to add artwork to cart");
    }
  };

  const handleCartClick = () => {
    navigate("/cart"); // Redirect to the /cart route
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-800 text-white py-16 mb-10 relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ArtFlake</h1>
          <p className="text-lg mb-6">
            Discover exquisite pieces from renowned artists around the world.
            Enjoy exclusive discounts this season!
          </p>
          <p className="text-2xl font-bold">Flat 10% Off on All Artworks!</p>
        </div>
        {/* Cart Icon */}
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={handleCartClick} // Handle cart icon click
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.361 2M7 13h10l4-8H5.361M7 13L5.361 5M7 13l2 8m10-8l-2 8m-8 0h8"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Art Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{art.title}</h2>
                <p className="text-gray-600 mt-2 text-sm">{art.description}</p>
                <p className="mt-2 text-gray-800 text-sm">
                  <span className="font-bold">Artist:</span> {art.artistName}
                </p>
                <p className="mt-2 text-gray-800 text-sm">
                  <span className="font-bold">Price:</span> Rs.{art.price}
                </p>
                <button
                  onClick={() => handleBuyNow(art.id)}
                  className="mt-4 bg-indigo-600 text-white px-3 py-1 text-sm rounded"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
