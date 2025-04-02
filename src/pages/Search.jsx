import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const location = useLocation();

  // Extract categoryId from URL query
  const categoryId = new URLSearchParams(location.search).get("categoryId");

  // Fetch products by categoryId
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch(`http://localhost:5000/products/category/${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (categoryId) fetchProducts();
  }, [categoryId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {categoryName ? `Products in ${categoryName}` : "Products"}
      </h2>

      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div className="mt-1 space-y-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="w-full bg-white shadow-lg border rounded-xl flex items-center p-4 space-x-4"
              >
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="h-14 w-14 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-md text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
