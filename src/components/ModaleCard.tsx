import { Globe, SquareChartGantt, Layers3 } from 'lucide-react';
import { Img } from 'react-image';
import { Button } from "./Button";
import '../sass/ModaleCard.scss';

interface ProjectData {
  title: string
  imagesModale: string[]
  descriptionModale: string
  category: string
  year: string
  technologies: string[]
  siteUrl: string
}

interface ModaleCardProps {
    project: ProjectData;
    onModeToggle: (isDark: boolean) => void;
    isDarkMode: boolean;
}

// interface DarkModeProps {
//     onModeToggle: (isDark: boolean) => void;
//     isDarkMode: boolean;
// }

const ModaleCard: React.FC<ModaleCardProps> = ( {project, isDarkMode} ) => {
  const { title, imagesModale, descriptionModale, category, year, technologies, siteUrl } = project

  return (
    <div className={`project-card ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="project-card__header">
        <h2 className="project-card__title">{title}</h2>
      </header>
      <div className="project-card__content">
        <div className="project-card__gallery">
          {imagesModale.map((image, index) => (
            <div key={index} className="project-card__image-wrapper">
              <Img
                src={image}
                alt={`Project screenshot ${index + 1}`}
                className="project-card__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <div className="project-card__details">
          <div className="project-card__description">
            <h3 className="project-card__subtitle">DESCRIPTION</h3>
            <p>{descriptionModale}</p>
          </div>
          <div className="project-card__info">
            <h3 className="project-card__subtitle">INFORMATIONS</h3>
            <p><Layers3 className="project-card__icon" />Catégorie : {category}</p>
            <p><SquareChartGantt className="project-card__icon" />Année : {year}</p>
            <div className="project-card__technologies">
              {technologies.map((tech) => (
                <span key={tech} className="project-card__tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="project-card__footer">
        <Button variant="outline" size="lg" isDarkMode={isDarkMode} className="project-card__button" onClick={() => window.open(siteUrl, '_blank')}>
          <Globe className="project-card__button-icon" />
          VOIR LE SITE
        </Button>
      </footer>
    </div>
  )
}

export default ModaleCard