import React from 'react';
import NightModeToggle from './NightModeToggle'
import '../sass/Banner.scss';

interface BannerProps {
  onModeToggle: (isDark: boolean) => void;
}

const Banner: React.FC<BannerProps> = ({ onModeToggle }) => {
  return (
    <nav className="banner">
      <div className="banner__container">
        <div className="banner__logo">
          {/* <img src="/path/to/your/logo.png" alt="Logo" /> */}
          Vizir.dev
        </div>
        <ul className="banner__links">
          <li><a href="#about">A propos</a></li>
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