import React from "react";
import LandingPageBanner from "../components/LandingPage/Banner";
import Footer from "../components/LandingPage/Footer";
import FeaturesList from "../components/LandingPage/FeaturesList";
import Navbar from "../components/LandingPage/Navbar";
import Showcase from "../components/LandingPage/Showcase";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <LandingPageBanner />
      <Showcase />
      <FeaturesList />
      <Footer />
    </div>
  );
};

export default LandingPage;
