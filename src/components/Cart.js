import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/cart-items/1/items`
          );
          setCartItems(response.data);
        } catch (error) {
          console.error("Failed to fetch cart items", error);
        }
      };

      fetchCartItems();
    }
  }, [user]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const fetchArtWorks = async () => {
        try {
          const artworkPromises = cartItems.map(item =>
            axios.get(`http://localhost:8080/artworks/${item.artworkId}`)
          );
          const artworkResponses = await Promise.all(artworkPromises);
          const artworksData = artworkResponses.map(res => res.data);
          setArtworks(artworksData);
          
        } catch (error) {
          console.error("Failed to fetch artworks", error);
        }
      };

      fetchArtWorks();
    }
  }, [cartItems]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleAdd = async (item) => {
    try {
      await axios.put(`http://localhost:8080/cart-items/${item.cartItemId}/add`);
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  const handleRemove = async (item, removeAll = false) => {
    try {
      await axios.put(`http://localhost:8080/cart-items/${item.cartItemId}/remove`, {
        removeAll,
      });
      if (removeAll || item.quantity === 1) {
        setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      } else {
        setCartItems((prevItems) =>
          prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
      }
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.artworkPrice * item.quantity,
    0
  );

  localStorage.setItem("total", totalPrice);

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAdd={() => handleAdd(item)}
                onRemove={() => handleRemove(item)}
                onRemoveAll={() => handleRemove(item, true)}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center border-t border-gray-300 pt-4">
            <span className="text-xl font-semibold">
              Total: Rs.{totalPrice}
            </span>
            <button
              onClick={handleCheckout}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
