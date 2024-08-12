import React from "react";

const Exhibitions = () => {
  const exhibitions = [
    {
      id: 1,
      title: "The Louvre Museum",
      date: "Aug 1 - Aug 15",
      image:
        "https://media.npr.org/assets/img/2021/03/29/gettyimages-1193604575_custom-33591482740dfb9875fe1a190e2e2ca895b19124.jpg?s=1100&c=50&f=jpeg",
    },
    {
      id: 2,
      title: "Van Gogh Museum",
      date: "Aug 16 - Aug 30",
      image:
        "https://www.vmcdn.ca/f/files/via/images/arts/vangogh-immersive-experience-vancouver-2020-(laurencelabat).jpg",
    },
    // Add more exhibitions as needed
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Current Exhibitions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitions.map((exhibition) => (
            <div
              key={exhibition.id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={exhibition.image}
                alt={exhibition.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{exhibition.title}</h3>
                <p className="text-gray-700">{exhibition.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exhibitions;
