import React from 'react';

const CartSummary = ({ totalPrice }) => {
  return (
    <div className="mt-10 text-right">
      <h3 className="text-xl font-semibold">Total: ${totalPrice}</h3>
      <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-orange-600">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
