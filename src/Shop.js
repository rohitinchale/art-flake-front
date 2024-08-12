import React from "react";
import Footer from "./components/Footer";

const artworks = [
  {
    id: 1,
    title: "Starry Night",
    description: "A beautiful depiction of the night sky.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    price: "100.00",
    artist: "Vincent van Gogh",
  },
  {
    id: 2,
    title: "Mona Lisa",
    description: "A portrait of a woman with an enigmatic expression.",
    image:
      "https://cdn.britannica.com/24/189624-050-F3C5BAA9/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg?w=300&h=169&c=crop",
    price: "250.00",
    artist: "Leonardo da Vinci",
  },
  {
    id: 3,
    title: "The Persistence of Memory",
    description: "A surreal painting featuring melting clocks.",
    image:
      "https://uploads1.wikiart.org/00475/images/salvador-dali/w1siziisijm4njq3mcjdlfsiccisimnvbnzlcnqilcitcxvhbgl0esa5mcatcmvzaxplidiwmdb4mjawmfx1mdazzsjdxq.jpg!Large.jpg",
    price: "150.00",
    artist: "Salvador Dalí",
  },
  {
    id: 4,
    title: "The Scream",
    description:
      "An iconic work depicting a figure with an agonized expression against a turbulent sky.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
    price: "200.00",
    artist: "Edvard Munch",
  },
  {
    id: 5,
    title: "Girl with a Pearl Earring",
    description:
      "A captivating portrait of a young girl wearing a pearl earring.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg",
    price: "175.00",
    artist: "Johannes Vermeer",
  },
  {
    id: 6,
    title: "The Last Supper",
    description:
      "A depiction of the last meal Jesus shared with his disciples.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/640px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg",
    price: "350.00",
    artist: "Leonardo da Vinci",
  },
];

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gray-800 text-white py-16 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Art Shop</h1>
          <p className="text-lg mb-6">
            Discover exquisite pieces from renowned artists around the world.
            Enjoy exclusive discounts this season!
          </p>
          <p className="text-2xl font-bold">Flat 10% Off on All Artworks!</p>
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
                  <span className="font-bold">Artist:</span> {art.artist}
                </p>
                <p className="mt-2 text-gray-800 text-sm">
                  <span className="font-bold">Price:</span> ${art.price}
                </p>
                <button className="mt-4 bg-indigo-600 text-white px-3 py-1 text-sm rounded">
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
