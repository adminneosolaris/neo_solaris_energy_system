import React from 'react';

import Hero from './Hero';
import TwoVerticals from '../Components/TwoVerticals';
import OurKeyDifferentiator from '../Components/OurKeyDifferentiator';
import LiveEnergyFlow from '../Components/LiveEnergyFlow';
import ArchitecturalBESS from '../Components/ArchitecturalBESS';
import CompleteSystemApproach from '../Components/CompleteSystemApproach';
import WhyNeoSolaris from '../Components/WhyNeoSolaris';





const Home = () => (
  <main className="w-full overflow-x-hidden bg-white">
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