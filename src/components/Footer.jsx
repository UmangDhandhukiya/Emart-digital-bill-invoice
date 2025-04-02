import React from "react";
import h from "../assets/h.png"; // Home icon
import s from "../assets/s.png"; // Search icon
import c from "../assets/c.png"; // Cart icon
import d from "../assets/d.png"; // Discount icon
import p from "../assets/p.png"; // Profile icon
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 h-20 w-screen bg-white border-t-2 flex items-center justify-evenly">
      {/* Home */}
      <div
        className="h-full w-full flex flex-col justify-center items-center"
        onClick={() => navigate("/home")}
      >
        <div
          className={`p-2 rounded-full ${
            isActive("/home") ? "bg-green-400" : ""
          }`}
        >
          <img src={h} className="h-7 w-7" alt="home" />
        </div>
        <h1 className={`text-md ${isActive("/home") ? "text-green-700" : ""}`}>
          home
        </h1>
      </div>

      {/* Search */}
      <div
        className="h-full w-full flex flex-col justify-center items-center"
        onClick={() => navigate("/search")}
      >
        <div
          className={`p-2 rounded-full ${
            isActive("/search") ? "bg-green-400" : ""
          }`}
        >
          <img src={s} className="h-7 w-7" alt="search" />
        </div>
        <h1 className={`text-md ${isActive("/search") ? "text-green-700" : ""}`}>
          search
        </h1>
      </div>

      {/* Cart */}
      <div
        className="h-full w-full flex flex-col justify-center items-center"
        onClick={() => navigate("/cart")}
      >
        <div
          className={`p-2 rounded-full ${
            isActive("/cart") ? "bg-green-400" : ""
          }`}
        >
          <img src={c} className="h-7 w-7" alt="cart" />
        </div>
        <h1 className={`text-md ${isActive("/cart") ? "text-green-700" : ""}`}>
          cart
        </h1>
      </div>

      {/* Discount */}
      <div
        className="h-full w-full flex flex-col justify-center items-center"
        onClick={() => navigate("/discount")}
      >
        <div
          className={`p-2 rounded-full ${
            isActive("/discount") ? "bg-green-400" : ""
          }`}
        >
          <img src={d} className="h-7 w-7" alt="discount" />
        </div>
        <h1 className={`text-md ${isActive("/discount") ? "text-green-700" : ""}`}>
          discount
        </h1>
      </div>

      {/* Profile */}
      <div
        className="h-full w-full flex flex-col justify-center items-center"
        onClick={() => navigate("/profile")}
      >
        <div
          className={`p-2 rounded-full ${
            isActive("/profile") ? "bg-green-400" : ""
          }`}
        >
          <img src={p} className="h-7 w-7" alt="profile" />
        </div>
        <h1 className={`text-md ${isActive("/profile") ? "text-green-700" : ""}`}>
          profile
        </h1>
      </div>
    </div>
  );
};

export default Footer;