// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'
          }`}
      >
        <div className={`
          mx-auto max-w-6xl px-6 flex items-center justify-between transition-all duration-300
          ${scrolled ? 'bg-bg/90 backdrop-blur-md border border-border rounded-full mx-4 py-3 px-6' : ''}
        `}>
          {/* Logo / Monogram */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center font-mono text-accent font-bold group-hover:border-accent transition-colors">
              DS
            </div>
            <span className="hidden sm:block font-mono text-secondary text-sm">
              ~/divit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-surface/50 border border-border rounded-full p-1 backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-300
                  ${activeSection === link.to
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                  }
                `}
              >
                {activeSection === link.to && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <MagneticButton className="relative z-10">
                  <span>{link.name}</span>
                </MagneticButton>
              </Link>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-secondary font-mono text-xs">ONLINE</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary p-2 hover:bg-surface rounded-lg transition-colors"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-light cursor-pointer transition-colors duration-300
                    ${activeSection === link.to
                      ? 'text-accent'
                      : 'text-secondary hover:text-primary'
                    }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Status */}
            <div className="flex items-center gap-2 mt-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-secondary font-mono text-sm">SYSTEM ONLINE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;