import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedArtworks from "./components/FeaturedArtworks";
import ArtistHighlights from "./components/ArtistHighlights";
import Exhibitions from "./components/Exhibitions";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedArtworks />
      <ArtistHighlights />
      <Exhibitions />
    </div>
  );
};

export default Home;
