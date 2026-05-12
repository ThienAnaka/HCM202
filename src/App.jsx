import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PresentationOverview from './components/PresentationOverview'
import TheorySection from './components/TheorySection'
import TypesOfConnections from './components/TypesOfConnections'
import DialecticalCategories from './components/DialecticalCategories'
import PracticalConnections from './components/PracticalConnections'
import MethodologicalMeaning from './components/MethodologicalMeaning'
import InteractiveGame from './components/InteractiveGame'
import MindMap from './components/MindMap'
import Footer from './components/Footer'
import FallingFlowers from './components/FallingFlowers'
import VideoSection from './components/VideoSection'
import MindmapPage from './components/MindmapPage'
import CardGame from './components/CardGame'

const HomePage = () => (
  <>
    <div id="home">
      <HeroSection />
    </div>
    <div id="theory">
      <TheorySection />
    </div>
    <div id="connections">
      <TypesOfConnections />
    </div>
    <div id="dialectics">
      <DialecticalCategories />
    </div>
    <div id="cases">
      <PracticalConnections />
    </div>
    <div id="methodology">
      <MethodologicalMeaning />
    </div>

    <InteractiveGame />
    
    <div id="mindmap">
      <MindMap />
    </div>
  </>
)

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace('#', '');
    const target = document.getElementById(targetId);

    if (!target) return;

    const handle = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => window.clearTimeout(handle);
  }, [location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <main className="bg-soviet-offwhite min-h-screen text-zinc-800">
        <FallingFlowers />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<PresentationOverview />} />
          <Route path="/video" element={<VideoSection />} />
          <Route path="/mindmap-detail" element={<MindmapPage />} />
          <Route path="/game" element={<CardGame />} />
        </Routes>
        
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
