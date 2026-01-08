import React,{ useEffect, useState } from "react";
import BannerCarousel from "../components/home/BannerCarousel";
import CategorySection from "../components/home/CategorySection";
import CollectionSection from "../components/home/CollectionSection";
import GenderSection from "../components/home/GenderSection";
import CoverSection1 from "../components/home/CoverSection1";
import CoverSection2 from "../components/home/CoverSection2";
import CoverSection3 from "../components/home/CoverSection3";
import OcassionSection from "../components/home/OcassionSection";
import ContactForm from "../components/contactus/ContactForm";

const Home = () => {
  
  return (
    <React.Fragment>
    <BannerCarousel></BannerCarousel>
    <hr className="lg:hidden md:hidden hide-hr"></hr>
    <CategorySection></CategorySection>
    <hr className="lg:hidden md:hidden hide-hr"></hr>
    <CoverSection1></CoverSection1>
    <CollectionSection></CollectionSection>
    <hr className="lg:hidden md:hidden hide-hr"></hr>
    <CoverSection2></CoverSection2>
    <GenderSection></GenderSection>
    <CoverSection3></CoverSection3>
    <OcassionSection></OcassionSection>
    <ContactForm />
    </React.Fragment>
  );
};

export default Home;
