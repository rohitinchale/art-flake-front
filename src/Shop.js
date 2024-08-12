import React from 'react';

const artworks = [
  {
    id: 1,
    title: 'Starry Night',
    description: 'A beautiful depiction of the night sky.',
    image: '/images/starry-night.jpg', // Ensure this path is correct
    price: '100.00',
    artist: 'Vincent van Gogh'
  },
  {
    id: 2,
    title: 'Mona Lisa',
    description: 'A portrait of a woman with an enigmatic expression.',
    image: '/images/mona-lisa.jpg', // Ensure this path is correct
    price: '250.00',
    artist: 'Leonardo da Vinci'
  },
  {
    id: 3,
    title: 'The Persistence of Memory',
    description: 'A surreal painting featuring melting clocks.',
    image: '/images/persistence-of-memory.jpg', // Ensure this path is correct
    price: '150.00',
    artist: 'Salvador Dalí'
  }
  // Add more artworks as needed
];

const Shop = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Art Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold">{art.title}</h2>
                <p className="text-gray-600 mt-2">{art.description}</p>
                <p className="mt-2 text-gray-800">
                  <span className="font-bold">Artist:</span> {art.artist}
                </p>
                <p className="mt-2 text-gray-800">
                  <span className="font-bold">Price:</span> ${art.price}
                </p>
                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
