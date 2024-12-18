import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import NightModeToggle from './NightModeToggle'
import '../sass/Banner.scss';

interface BannerProps {
  onModeToggle: (isDark: boolean) => void;
}

const Banner: React.FC<BannerProps> = ({ onModeToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleModeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
    onModeToggle(isDark);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`banner ${scrolled ? 'banner--scrolled' : ''}`}>
      <div className="banner__container">
        <div className="banner__menu-icon" onClick={toggleMenu}>
          <Menu />
        </div>
        <a href="#home">
          <div className={`banner__logo ${scrolled ? 'banner--scrolled-logo' : ''} ${isDarkMode ? 'dark-mode-title-banner' : ''}`}>
            Vizir.dev
          </div>
        </a>
        <ul className={`banner__links ${menuOpen ? 'banner__links--open' : ''} ${scrolled ? 'banner--scrolled-links' : ''} ${isDarkMode ? 'dark-mode-title-banner' : ''}`}>
          <li><a href="#about">A propos</a></li>
          <li><a href="#course">Parcours</a></li>
          <li><a href="#skills">Compétences</a></li>
          <li><a href="#projects">Projets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div>
          <NightModeToggle onToggle={handleModeToggle} />
        </div>
      </div>
    </nav>
  );
};

export default Banner;