import React, { useState } from 'react';

const Addcart = () => {
  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);

  // Example function to add a product to the cart
  const addProductToCart = () => {
    const newProduct = {
      id: cartItems.length + 1,
      name: `Product ${cartItems.length + 1}`,
      price: 10.99,
    };
    setCartItems([...cartItems, newProduct]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      {cartItems.length === 0 ? (
        // Display when the cart is empty
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" // Replace with your image URL
            alt="Empty Cart"
            className="w-32 h-32 mx-auto opacity-50" // Reduced opacity
          />
          <p className="mt-4 text-xl text-gray-600">Your cart is empty</p>
          <p className="text-gray-500">Please start shopping!</p>
        </div>
      ) : (
        // Display when the cart has items
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-200 py-4">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setCartItems(cartItems.filter((i) => i.id !== item.id))}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-6 flex justify-end">
              <p className="text-xl font-bold text-gray-800">
                Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addcart;