import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const cart = location.state?.cart || {};

  // State to handle order placement
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = JSON.parse(localStorage.getItem("total"));

  const calculateTotal = () => {
    return Object.values(cart).reduce((total, quantity) => {
      const price = 100; // Assuming each item costs $100 for simplicity
      return total + quantity * price;
    }, 0);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true); // Set orderPlaced to true when the order is placed
  };

  return (
    <div className="container mx-auto px-4 mt-10">
      <h2 className="text-4xl font-bold mb-8 text-center">Checkout</h2>

      {/* Conditional Rendering for Order Placed Message */}
      {orderPlaced ? (
        <div className="bg-green-100 text-green-700 p-6 rounded-md text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Order Placed Successfully!
          </h3>
          <p>
            Thank you for your purchase. Your order will be processed shortly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
            <ul>
              {Object.entries(cart).map(([id, quantity]) => (
                <li key={id} className="flex justify-between items-center mb-4">
                  <span>Artwork ID: {id}</span>
                  <span>Quantity: {quantity}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">Rs. {total}</span>
            </div>
          </div>

          {/* Payment & Shipping Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Payment & Shipping Details
            </h3>
            <form onSubmit={handlePlaceOrder}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Address
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Card Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    pattern="\d{3}"
                    maxLength="3"
                    required
                    title="CVV is the 3 digit number mentioned on your credit card"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-indigo-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-indigo-700"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
