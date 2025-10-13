import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Features from "../HomePage_Components/Features";
import ChooseUs from "../HomePage_Components/ChooseUs";
import HowItWorks from "../HomePage_Components/HowItWorks";
import Pricing from "../HomePage_Components/Pricing";
import {Link} from 'react-router-dom'
import Hero from '../components/Hero'
import DashboardPreview from "../HomePage_Components/DashboardPreview";
import FinalCTA from "../HomePage_Components/FinalCTA";
const Home = () => {


  return (
    <>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <DashboardPreview/>
    <ChooseUs/>
    <Pricing/>
    <FinalCTA/>
    </>

  );
};
export default Home;
