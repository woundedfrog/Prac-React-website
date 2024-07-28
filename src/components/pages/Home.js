import React from 'react';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Cards from '../Cards';

import '../../App.css';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}
