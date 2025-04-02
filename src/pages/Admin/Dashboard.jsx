import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faBox,
  faShoppingCart,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-blue-700 to-blue-500 w-64 min-h-screen shadow-lg fixed transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        } transition-transform duration-200 ease-in-out lg:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">E-Mart Admin</h1>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin"
            className="flex items-center px-6 py-3 text-white hover:bg-blue-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/manage-users"
            className="flex items-center px-6 py-3 text-white hover:bg-blue-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faUsers} className="mr-3" />
            Manage Users
          </Link>
          <Link
            to="/admin/add-categories"
            className="flex items-center px-6 py-3 text-white hover:bg-blue-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faBox} className="mr-3" />
            Manage Categories
          </Link>
          <Link
            to="/admin/add-product"
            className="flex items-center px-6 py-3 text-white hover:bg-blue-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-3" />
            Manage Products
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:ml-64">
        {/* Toggle Button for Mobile */}
        <button
          className="lg:hidden p-3 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-500 transition duration-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* Nested Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;