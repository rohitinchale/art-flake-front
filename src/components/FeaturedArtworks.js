import React from "react";
// import seashore from "../images/seashore.webp";

const FeaturedArtworks = () => {
  const artworks = [
    {
      id: 1,
      title: "Artwork 1",
      image:
        "https://i.etsystatic.com/8663796/r/il/193846/2899370131/il_570xN.2899370131_kzf2.jpg",
    },
    {
      id: 2,
      title: "Artwork 2",
      image:
        "https://e0.pxfuel.com/wallpapers/521/311/desktop-wallpaper-world-famous-abstract-art-paintings-page-1.jpg",
    },
    // Add more artworks as needed
  ];

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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtworks;
