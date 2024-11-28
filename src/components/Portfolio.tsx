import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Power } from 'lucide-react'
import Banner from "./Banner"
import Course from "./Course"
import Interactiv from './Interactiv'
import IconSphere from "./IconSphere"
import { Button } from "./Button"
import { Input } from "./Input"
import { Textarea } from "./Textarea"
import projects from '../data/projects.js'
import ModaleCard from "./ModaleCard"
import "../sass/Portfolio.scss"

const photo = require("../assets/charles-lgs.png")

interface ProjectData {
  title: string
  imagesModale: string[]
  descriptionModale: string
  category: string
  year: string
  technologies: string[]
  siteUrl: string
}

// Constantes pour les liens
const GITHUB_LINK = "https://github.com/charles-lgs";
const LINKEDIN_LINK = "https://www.linkedin.com/in/charles-langlois-70aaa42b3/";
const EMAIL = "charles.langlois.dev@gmail.com";

export default function Portfolio() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true);

  // For modale
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleModeToggle = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        setName('')
        setEmail('')
        setMessage('')
        alert('Message envoyé avec succès !')
      } else {
        alert('Une erreur est survenue lors de l\'envoi du message.')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
      alert('Une erreur est survenue lors de l\'envoi du message.')
    }
  };

  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  return (
    <div className={`portfolio ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Interactiv />
      <Banner onModeToggle={handleModeToggle} />
      {/* Hero Section */}
      <section id='home' className="portfolio__hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="portfolio__hero-content"
        >
          <p className={`portfolio__hero-subtitle ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>Hello, je suis</p>
          <h1 className={`portfolio__hero-title ${isDarkMode ? 'dark-mode-hero-title' : 'light-mode-hero-title'}`}>Charles Langlois</h1>
          <p className={`portfolio__hero-subtitle size ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>Développeur Web Front-End</p>
          <div className="portfolio__hero-buttons">
            <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" isDarkMode={isDarkMode}><Github className="mr-2 h-4 w-4" />GitHub</Button>
            </a>
            <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" isDarkMode={isDarkMode}><Linkedin className="mr-2 h-4 w-4" />LinkedIn</Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id='about' className="portfolio__section color-section shadow">
        <h2 className="portfolio__section-title">A propos de moi</h2>
        <h3 className="portfolio__section-subtitle grey-color">Présentation</h3>
        <div className="portfolio__about">
          <img src={photo} alt="Photo de Charles Langlois" className="portfolio__about-image" />
          <div className="portfolio__about-text">
            <p>Je suis un passionné d’informatique, d’art et de littérature depuis mes plus jeunes années. Il y a peu, j’ai entamé une reconversion professionnelle pour allier ces trois passions et devenir Développeur Web.</p>
            <p>Pour moi écrire du code pour créer un site ou un composant numérique, me donne l’impression de concevoir une œuvre unique, qui prend vie sous la souris de son utilisateur.</p>
            <p>Le développement est un art que j’apprends principalement en autodidacte. Je souhaite devenir indépendant et contribuer à élever cette discipline.</p>
            <p>Mon expertise inclus React, Node.js et TypeScript donc si un projet vous tiens à cœur, je serais heureux de vous aider à le concrétiser.</p>
          </div>
        </div>
      </section>
      
      <div className='section-center'>
        {/* Course section */}
        <section id='course' className="portfolio__section padding-bottom">
          <div>
            <h2 className={`portfolio__section-title ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>Mon Parcours</h2>
            <h3 className="portfolio__section-subtitle beige-color">Mon Expérience</h3>
            <Course onModeToggle={handleModeToggle} isDarkMode={isDarkMode} />
          </div>
        </section>

        {/* Skills section */}
        <section id='skills' className={`portfolio__section skills ${isDarkMode ? 'dark-skills' : 'light-skills'}`}>
            <h2 className={`portfolio__section-title ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>Mes Compétences</h2>
            <h3 className={`portfolio__section-subtitle ${isDarkMode ? 'beige-color' : ''}`}>Mes Softskills</h3>
          <div className='portfolio__section-icons'>
            <div className={`portfolio__section--icons-txt ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>
              <p>Utilisation de technologies qui ont leurs preuves.</p>
              <p>Telle que React, Redux et Sass.</p>
            </div>
              <IconSphere onModeToggle={handleModeToggle} isDarkMode={isDarkMode} />
          </div>
        </section>
        
        {/* Projects Section */}
        <section id='projects' className="portfolio__section">
        <h2 className={`portfolio__section-title ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>Mes Projets</h2>
        <h3 className="portfolio__section-subtitle beige-color">Mon Portfolio</h3>
          <div className="portfolio__projects">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.10 }}
                className="portfolio__projects-item"
              >
                <img src={project.image} alt={project.title} className="portfolio__projects-image" />
                <div className="portfolio__projects-content">
                  <h3 className="portfolio__projects-title">{project.title}</h3>
                  <p className="portfolio__projects-description">{project.description}</p>
                  <div className="portfolio__projects--container-links">
                    <button onClick={() => openModal(project)} className="portfolio__projects-link" aria-haspopup="dialog" aria-controls="project-modal">
                      Voir Plus <ExternalLink className="ml-1 h-4 w-4" />
                    </button>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="portfolio__projects-link">
                      GitHub <Github className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Modale */}
      {showModal && selectedProject && (
        <div id="project-modal" className="project-modal" role="dialog" aria-labelledby={`modal-title-${selectedProject.title}`} aria-modal="true" onClick={closeModal}>
          <div className={`project-modal-content ${isDarkMode ? 'dark-mode-modal' : 'light-mode-modal'}`} onClick={(e) => e.stopPropagation()}>
            <button className={`close-modal ${isDarkMode ? 'dark-close-modal' : ''}`} onClick={closeModal}><Power /></button>
            <ModaleCard project={selectedProject} onModeToggle={handleModeToggle} isDarkMode={isDarkMode} />
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id='contact' className="portfolio__section color-section shadow">
        <h2 className="portfolio__section-title">Contact</h2>
        <h3 className="portfolio__section-subtitle grey-color">Get in Touch</h3>
        <form onSubmit={handleSubmit} className="portfolio__contact-form">
          <div className="portfolio__form-group">
            <Input
              type="text"
              placeholder="Votre Nom"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </div>
          <div className="portfolio__form-group">
            <Input
              type="email"
              placeholder="Votre Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="portfolio__form-group">
            <Textarea
              placeholder="Votre Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          <Button type="submit" className="portfolio__contact-button">
            Envoyer <ChevronRight />
          </Button>
        </form>
      </section>

      {/* Footer */}
      <footer className={`portfolio__footer ${isDarkMode ? 'dark-mode-footer' : 'light-mode-footer'}`}>
        <div className="portfolio__footer-container">
          <p className="portfolio__copyright">&copy; 2024 Vizir-dev.fr. All rights reserved.</p>
          <div className="portfolio__social-links">
            <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className={`portfolio__social-link ${isDarkMode ? 'dark-mode-footer-link' : 'light-mode-footer-link'}`} aria-label="GitHub"><Github className="h-6 w-6" /></a>
            <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className={`portfolio__social-link ${isDarkMode ? 'dark-mode-footer-link' : 'light-mode-footer-link'}`} aria-label="LinkedIn"><Linkedin className="h-6 w-6" /></a>
            <a href={`mailto:${EMAIL}`} className={`portfolio__social-link ${isDarkMode ? 'dark-mode-footer-link' : 'light-mode-footer-link'}`} aria-label="Email"><Mail className="h-6 w-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}