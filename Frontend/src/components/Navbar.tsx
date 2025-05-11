import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section: string) => {
    if (location.pathname !== '/') {
      // If we're not on the landing page, navigate to it first
      navigate('/', { state: { scrollTo: section } });
    } else {
      // If we're already on the landing page, just scroll to the section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Features', section: 'features' },
    { name: 'Analytics', section: 'analytics' },
    // { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.section)}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/workflow" className="btn-outline hover:bg-muted/50 transition-all">
              Workflow
            </Link>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md bg-muted/80 hover:bg-muted"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md mt-3 px-4 py-5 rounded-lg shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.section)}
                className="text-foreground/80 hover:text-foreground py-2 transition-colors font-medium text-left"
              >
                {link.name}
              </button>
            ))}
            <Link
              to="/workflow"
              className="btn-outline w-full text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Workflow
            </Link>
            <Link
              to="/login"
              className="btn-primary w-full text-center mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
