import React from "react";
import LandingPageBanner from "../components/LandingPage/Banner";
import Contribution from "../components/LandingPage/Contribution";
import FeaturesList from "../components/LandingPage/FeaturesList";
import LandingPageNavbar from "../components/LandingPage/LandingPageNavbar";
import Showcase from "../components/LandingPage/Showcase";

const LandingPage = () => {
  return (
    <div>
      <LandingPageNavbar />
      <LandingPageBanner />
      <Showcase />
      <FeaturesList />
      <Contribution />
    </div>
  );
};

export default LandingPage;
