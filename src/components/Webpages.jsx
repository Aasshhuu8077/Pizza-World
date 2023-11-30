import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";

const Webpages = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Webpages;
