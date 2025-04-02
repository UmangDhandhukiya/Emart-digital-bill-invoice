import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This will render the matched route component */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
