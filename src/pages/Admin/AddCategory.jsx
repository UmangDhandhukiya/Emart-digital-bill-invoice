import React, { useState, useEffect } from 'react';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/usercategories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Add or Update Category
  const handleAddOrUpdateCategory = async () => {
    const formData = new FormData();
    formData.append('name', categoryName);
    if (categoryImage) {
      formData.append('image', categoryImage); // Include the image file
    }

    try {
      const url = editCategoryId
        ? `http://localhost:5000/categories/${editCategoryId}` // Update existing category
        : 'http://localhost:5000/categories'; // Add new category

      const method = editCategoryId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        throw new Error(errorData.error || 'Failed to add/update category');
      }

      const data = await response.json();
      console.log(editCategoryId ? 'Category updated:' : 'Category added:', data);

      // Reset form and fetch updated categories
      setCategoryName('');
      setCategoryImage(null);
      setEditCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error('Failed to add/update category:', error.message || error);
    }
  };

  // Edit Category
  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setEditCategoryId(category.id);
  };

 // Delete Category in React
const handleDeleteCategory = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/categories/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Category deleted successfully');
      fetchCategories(); // Refresh the category list
    } else {
      const errorData = await response.json();
      console.error('Failed to delete category:', errorData.error || 'Unknown error');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Categories</h1>

      {/* Add/Edit Category Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {editCategoryId ? 'Edit Category' : 'Add Category'}
        </h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddOrUpdateCategory}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition duration-200"
          >
            {editCategoryId ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </div>

      {/* Display Categories Section */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{category.id}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{category.name}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {category.image && (
                    <img
                      src={`http://localhost:5000${category.image}`}
                      alt={category.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
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

export default AddCategory;
