import React, { useState } from 'react';
import '../sass/Course.scss';
import {Button} from "./Button"
import cards from "../data/course.js"

interface Card {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  category: 'pro' | 'training';
}

interface CourseProps {
  onModeToggle: (isDark: boolean) => void;
  isDarkMode: boolean;
}

const Course: React.FC<CourseProps> = ({ isDarkMode }) => {
  const [filter, setFilter] = useState<'all' | 'pro' | 'training'>('all');

  const filteredCards = cards.filter(card => 
    filter === 'all' || card.category === filter
  );

  return (
    <div className="gallery">
      <div className="filter-buttons">
        <Button variant="outline" size="lg" isDarkMode={isDarkMode} onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Tous</Button>
        <Button variant="outline" size="lg" isDarkMode={isDarkMode} onClick={() => setFilter('pro')} className={filter === 'pro' ? 'active' : ''}>Pro</Button>
        <Button variant="outline" size="lg" isDarkMode={isDarkMode} onClick={() => setFilter('training')} className={filter === 'training' ? 'active' : ''}>Formations</Button>
      </div>
      <div className="card-grid">
        {filteredCards.map(card => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <h3>{card.subtitle}</h3>
            <p>{card.description}</p>
            <a href={card.link} target="_blank" rel="noopener noreferrer" className="see-more">Entreprise</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course