// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  // Move the menu state from App.jsx into this layout
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(90deg, rgba(226,185,235,1) 0%, rgba(213,237,237,1) 50%, rgba(215,185,237,1) 100%)",
      }}
    >
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className="flex-grow">
        {/* The Outlet component will render the specific page (Home, Signup, etc.) */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;