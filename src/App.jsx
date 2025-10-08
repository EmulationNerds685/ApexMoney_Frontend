import React, { useState } from "react";

import Header from "./components/Header";
import Hero from './components/HeaderHero'
const App = () => {
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
      <Hero />
    </div>
  );
};

export default App;