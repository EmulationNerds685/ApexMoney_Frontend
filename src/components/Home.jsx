// src/pages/Home.jsx

import React from "react";
import Hero from '../components/Hero';
import Features from "../HomePage_Components/Features";
import HowItWorks from "../HomePage_Components/HowItWorks";
import DashboardPreview from "../HomePage_Components/DashboardPreview";
import ChooseUs from "../HomePage_Components/ChooseUs";
import Pricing from "../HomePage_Components/Pricing";
import FinalCTA from "../HomePage_Components/FinalCTA";

// Import your new wrapper component
import AnimateOnScroll from "../components/ui/AnimateOnScroll";

const Home = () => {
  return (
    <>
      {/* The Hero is usually visible on load, so it may not need scroll animation */}
      <Hero />

      {/* Wrap each subsequent section with the AnimateOnScroll component */}
      <AnimateOnScroll>
        <Features />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <HowItWorks />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <DashboardPreview />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <ChooseUs />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Pricing />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <FinalCTA />
      </AnimateOnScroll>
    </>
  );
};

export default Home;