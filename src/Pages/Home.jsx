import React from 'react';

import Hero from './Hero';
import TwoVerticals from '../Components/TwoVerticals';
import OurKeyDifferentiator from '../Components/OurKeyDifferentiator';
import LiveEnergyFlow from '../Components/LiveEnergyFlow';
import ArchitecturalBESS from '../Components/ArchitecturalBESS';
import CompleteSystemApproach from '../Components/CompleteSystemApproach';
import WhyNeoSolaris from '../Components/WhyNeoSolaris';
import { Helmet } from 'react-helmet-async';



const Home = () => (
  <main className="w-full overflow-x-hidden bg-white">
    <Helmet>
      <title>Neo Solaris - Energy Systems | Live Energy Experience Centre</title>
      <meta name='description' content="Discover advanced solar-powered energy systems and standalone battery energy storage solutions with Neo Solaris." />
    </Helmet>

    <Hero />
    <TwoVerticals />
    <OurKeyDifferentiator />
    <LiveEnergyFlow />
    <ArchitecturalBESS />
    <CompleteSystemApproach />
    <WhyNeoSolaris />
  </main>
);

export default Home;