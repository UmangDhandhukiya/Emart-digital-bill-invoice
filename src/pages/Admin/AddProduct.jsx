import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  // Fetch all categories and products on component mount
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/usercategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products'); // Updated route
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Handle Add or Update Product
  const handleAddOrUpdateProduct = async () => {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', productPrice);
    formData.append('categoryId', categoryId);
    if (productImage) {
      formData.append('image', productImage);
    }

    try {
      const method = editProductId ? 'PUT' : 'POST';
      const url = editProductId
        ? `http://localhost:5000/products/${editProductId}`
        : 'http://localhost:5000/products';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      // Refresh the list of products after add/update
      fetchProducts();
      resetForm(); // Reset the form after submission
    } catch (error) {
      console.error('Failed to add/update product:', error);
    }
  };

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
    setCategoryId('');
    setEditProductId(null);
  };

  // Edit Product
  const handleEditProduct = (product) => {
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setCategoryId(product.categoryId);
    setEditProductId(product.id);
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h1>

      {/* Add/Edit Product Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editProductId ? 'Edit Product' : 'Add Product'}
        </h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Product Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => setProductImage(e.target.files[0])}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddOrUpdateProduct}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition duration-200"
          >
            {editProductId ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Display Products Section */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{product.id}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{product.name}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{product.category.name}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{product.price}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {product.image && (
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;
