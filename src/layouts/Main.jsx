import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Main = () => {
  return (
    <>
      <div className="flex flex-col  h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-indigo-200 via-blue-200 to-purple-200">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Main;
