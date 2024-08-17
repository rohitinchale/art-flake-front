// CartItem.js

import React from "react";

const CartItem = ({ item, onAdd, onRemove, onRemoveAll }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <img
        src={item.artworkImageUrl}
        alt={item.artworkTitle}
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-semibold">{item.artworkTitle}</h2>
        {/* <p className="text-gray-600">Artist: {item.artworkDescription}</p> */}
        <p className="text-gray-600">Price: Rs.{item.artworkPrice}</p>
        <div className="flex items-center">
          <button
            onClick={onRemove}
            className="px-2 py-1 text-white bg-red-500 rounded"
          >
            -
          </button>
          <span className="px-3">{item.quantity}</span>
          <button
            onClick={onAdd}
            className="px-2 py-1 text-white bg-green-500 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={onRemoveAll}
        className="px-3 py-1 text-white bg-red-700 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
