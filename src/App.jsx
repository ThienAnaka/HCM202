import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PresentationOverview from './components/PresentationOverview'
import LessonToc from './components/LessonToc'
import TheorySection from './components/TheorySection'
import TypesOfConnections from './components/TypesOfConnections'
import DialecticalCategories from './components/DialecticalCategories'
import MethodologicalMeaning from './components/MethodologicalMeaning'
import MindMap from './components/MindMap'
import Footer from './components/Footer'
import FallingFlowers from './components/FallingFlowers'
import FloatingChatWidget from './components/FloatingChatWidget'
import VideoSection from './components/VideoSection'
import TugOfWarGame from './components/TugOfWarGame'

const HomePage = () => (
  <>
    <div id="home">
      <HeroSection />
    </div>
    <div id="overview-toc">
      <LessonToc />
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
    <div id="methodology">
      <MethodologicalMeaning />
    </div>
    
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
      <main className="relative bg-soviet-offwhite min-h-screen text-zinc-800">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/image/download.gif')" }}
          />
          <div className="absolute inset-0 bg-white/75" />
        </div>
        <FallingFlowers />
        <Navbar />
        <FloatingChatWidget />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<PresentationOverview />} />
          <Route path="/video" element={<VideoSection />} />
          <Route path="/game" element={<TugOfWarGame />} />
        </Routes>
        
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
