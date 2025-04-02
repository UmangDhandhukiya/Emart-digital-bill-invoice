import React, { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/displayuser');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  // const handleDelete = async (userId) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/deleteusers/${userId}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       setUsers(users.filter((user) => user.id !== userId)); // Remove user from the list
  //     } else {
  //       console.error('Failed to delete user');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteusers/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId)); // Remove user from the list
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Created At</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{user.id}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm">
                  <button
                    onClick={() => handleDelete(user.id)}
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

export default ManageUsers;