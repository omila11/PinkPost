import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedBoxes from '../components/FeaturedBoxes';
import CustomizeSection from '../components/CustomizeSection';
import CreativitySection from '../components/CreativitySection';
import FooterLinks from '../components/FooterLinks';

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <FeaturedBoxes />
      <CustomizeSection />
      <CreativitySection />
      <FooterLinks />
    </div>
  );
}
