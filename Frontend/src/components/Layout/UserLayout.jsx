import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const UserLayout = () => {
  return (
    <>
      <Header /> {/* Header Component */}
      <main>
        <Outlet />
      </main>
      {/* Main Content */}
      <Footer /> {/* Footer Component */}
    </>
  );
};

export default UserLayout;
