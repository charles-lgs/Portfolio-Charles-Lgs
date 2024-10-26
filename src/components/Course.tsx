import React, { useState } from 'react';
import '../sass/Course.scss';
import {Button} from "./Button"

interface Card {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: 'pro' | 'training';
}

const cards: Card[] = [
  { id: 1, title: "Stage en développement web", subtitle: "Nicolas CAISSO, Distanciel", description: "Description du stage", category: "pro" },
  { id: 2, title: "Création d'une micro-entreprise", subtitle: "Etabl 79, QUIMPER", description: "Description de la création", category: "pro" },
  { id: 3, title: "Employée polyvalente", subtitle: "Cornouaille Diffusion, ERGUE GABERIC", description: "Description du poste", category: "pro" },
  { id: 4, title: "Apprentie coiffeuse", subtitle: "Passage bleu, METZ", description: "Description de l'apprentissage", category: "training" },
  { id: 5, title: "Bac +2 Développeur Web", subtitle: "La Digital School, BREST", description: "Description de la formation", category: "training" },
  { id: 6, title: "CAP Coiffure", subtitle: "CFA de METZ", description: "Description de la formation", category: "training" },
  { id: 7, title: "Bac Littéraire", subtitle: "Lycée de la communication, METZ", description: "Description du baccalauréat", category: "training" },
];

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'pro' | 'training'>('all');

  const filteredCards = cards.filter(card => 
    filter === 'all' || card.category === filter
  );

  return (
    <div className="gallery">
      <div className="filter-buttons">
        <Button variant="outline" size="sm" onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Tous</Button>
        <Button variant="outline" size="sm" onClick={() => setFilter('pro')} className={filter === 'pro' ? 'active' : ''}>Pro</Button>
        <Button variant="outline" size="sm" onClick={() => setFilter('training')} className={filter === 'training' ? 'active' : ''}>Formations</Button>
      </div>
      <div className="card-grid">
        {filteredCards.map(card => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <h3>{card.subtitle}</h3>
            <p>{card.description}</p>
            <a href="#" className="see-more">Voir plus</a>
          </div>
        ))}
      </div>
    </div>
  );
}