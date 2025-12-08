import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import NoiseBackground from './components/NoiseBackground';
import { Element } from 'react-scroll';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'achievements', 'contact'];
      let currentSection = 'hero';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    // Track mouse for spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-primary font-sans relative">

      {/* Film Grain Texture (Top Layer) */}
      <NoiseBackground />

      {/* Global Spotlight Effect (Middle Layer) */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.06), transparent 80%)`
        }}
      />

      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <Element name="hero" id="hero"><Hero /></Element>
        <Element name="about" id="about"><About /></Element>
        <Element name="skills" id="skills"><Skills /></Element>
        <Element name="projects" id="projects"><Projects /></Element>
        <Element name="experience" id="experience"><Experience /></Element>
        <Element name="education" id="education"><Education /></Element>
        <Element name="achievements" id="achievements"><Achievements /></Element>
        <Element name="contact" id="contact"><Contact /></Element>
      </main>

      <Footer />
    </div>
  );
};

export default App;