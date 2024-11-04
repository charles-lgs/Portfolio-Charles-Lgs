import React, { useState, useEffect } from 'react';
import NightModeToggle from './NightModeToggle'
import '../sass/Banner.scss';

interface BannerProps {
  onModeToggle: (isDark: boolean) => void;
}

const Banner: React.FC<BannerProps> = ({ onModeToggle }) => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`banner ${scrolled ? 'banner--scrolled' : ''}`}>
      <div className="banner__container">
        <div className={`banner__logo ${scrolled ? 'banner--scrolled-logo' : ''}`}>
          Vizir.dev
        </div>
        <ul className={`banner__links ${scrolled ? 'banner--scrolled-links' : ''}`}>
          <li><a href="#about">A propos</a></li>
          <li><a href="#course">Parcours</a></li>
          <li><a href="#projects">Projets</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div>
          <NightModeToggle onToggle={onModeToggle} />
        </div>
      </div>
    </nav>
  );
};

export default Banner;