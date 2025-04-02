import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 h-16 w-screen border-b-2 p-2 mb-1 bg-white flex items-center justify-between">
      <div className="flex items-center gap-1">
        <img src={logo} className="h-7 w-7" alt="Logo" />
        <h1 className="text-lg">E-Mart</h1>
      </div>
      <div>
        <h1 className="text-lg">Hi,User</h1>
      </div>
    </div>
  );
};

export default Header;
