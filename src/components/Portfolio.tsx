import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react'
import Banner from "./Banner"
import Course from "./Course"
import Interactiv from './Interactiv'
import IconSphere from "./IconSphere"
import { Button } from "./Button"
import { Input } from "./Input"
import { Textarea } from "./Textarea"
import projects from '../data/projects.js'
import "../sass/Portfolio.scss"

const photo = require("../assets/charles-lgs.png")

// Constantes pour les liens
const GITHUB_LINK = "https://github.com/charles-lgs";
const LINKEDIN_LINK = "https://www.linkedin.com/in/charles-langlois-70aaa42b3/";
const EMAIL = "charles.langlois.dev@gmail.com";

export default function Portfolio() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        // Réinitialiser les champs du formulaire
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
  }

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
              <Button variant="outline" size="lg" isDarkMode={isDarkMode}><Github className="mr-2 h-4 w-4" /> GitHub</Button>
            </a>
            <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" isDarkMode={isDarkMode}><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
            </a>
          </div>
        </motion.div>
        <div className="portfolio__hero-container-deco">
          <div>Sass</div>
          <div>.</div>
          <div>React</div>
          <div>.</div>
          <div>Seo</div>
        </div>
      </section>

      {/* About Me Section */}
      <section id='about' className="portfolio__section color-section shadow">
        <h2 className="portfolio__section-title z-index">A propos de moi</h2>
        <div className="portfolio__about">
          <img src={photo} alt="Photo de Charles Langlois" className="portfolio__about-image z-index" />
          <div className="portfolio__about-text z-index">
            <p>I'm a passionate full stack developer with 5 years of experience in creating robust and scalable web applications. My expertise includes React, Node.js, and Python.</p>
            <p>When I'm not coding, you can find me hiking in the mountains or experimenting with new recipes in the kitchen.</p>
          </div>
        </div>
      </section>

      {/* Course section */}
      <section id='course' className="portfolio__section padding-bottom">
        <div>
          <h2 className={`portfolio__section-title ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>Mon parcours</h2>
          <Course />
        </div>
      </section>

      <section className="portfolio__section color-section shadow">
        <IconSphere />
      </section>
      
      {/* Projects Section */}
      <section id='projects' className="portfolio__section dark-mode-projects">
      <h2 className={`portfolio__section-title ${isDarkMode ? 'dark-mode-section-title' : 'light-mode-section-title'}`}>Mes projets</h2>
        <div className="portfolio__projects">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              className="portfolio__projects-item z-index"
            >
              <img src={project.image} alt={project.title} className="portfolio__projects-image" />
              <div className="portfolio__projects-content">
                <h3 className="portfolio__projects-title">{project.title}</h3>
                <p className="portfolio__projects-description">{project.description}</p>
                <div className="portfolio__projects-links">
                  <a href="#" className="portfolio__projects-link">
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                  <a href="#" className="portfolio__projects-link">
                    GitHub <Github className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className="portfolio__section color-section shadow">
        <h2 className="portfolio__section-title">Contact</h2>
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
            Envoyer <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </section>

      {/* Footer */}
      <footer className={`portfolio__footer ${isDarkMode ? 'dark-mode-footer' : 'light-mode-footer'}`}>
        <div className="portfolio__footer-container">
          <p className="portfolio__copyright">&copy; 2024 Vizir.dev.com. All rights reserved.</p>
          <div className="portfolio__social-links">
            <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className={`portfolio__social-link z-index ${isDarkMode ? 'dark-mode-footer-link' : 'light-mode-footer-link'}`}><Github className="h-6 w-6" /></a>
            <a href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer" className={`portfolio__social-link z-index ${isDarkMode ? 'dark-mode-footer-link' : 'light-mode-footer-link'}`}><Linkedin className="h-6 w-6" /></a>
            <a href={`mailto:${EMAIL}`} className={`portfolio__social-link z-index ${isDarkMode ? 'dark-mode-footer-link' : 'light-mode-footer-link'}`}><Mail className="h-6 w-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}