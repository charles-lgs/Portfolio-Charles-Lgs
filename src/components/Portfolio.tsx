import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react'
import Banner from "./Banner"
import { Button } from "./Button"
import { Input } from "./Input"
import { Textarea } from "./Textarea"
import projects from '../data/projects.js'
import "../sass/Portfolio.scss"

const photo = require("../assets/johndoe.png")
const waveOne = require("../assets/wave-one.png")
const waveTwo = require("../assets/wave-two.png")

// Constantes pour les liens
const GITHUB_LINK = "https://github.com/votre-username";
const LINKEDIN_LINK = "https://www.linkedin.com/in/votre-profil";
const EMAIL = "votre-email@example.com";

export default function Portfolio() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true);

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
    <div className="portfolio">
      <Banner onModeToggle={handleModeToggle} />
      {/* Hero Section */}
      <section className={`portfolio__hero ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="portfolio__hero-content"
        >
          <h1 className="portfolio__hero-title">Jane Doe</h1>
          <p className="portfolio__hero-subtitle">Full Stack Web Developer</p>
          <div className="portfolio__hero-buttons">
            <Button variant="outline"><Github className="mr-2 h-4 w-4" /> GitHub</Button>
            <Button variant="outline"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
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
      <section className="portfolio__section">
        <h2 className="portfolio__section-title">About Me</h2>
        <div className="portfolio__about">
          <img src={photo} alt="Jane Doe" className="portfolio__about-image" />
          <div className="portfolio__about-text">
            <p>I'm a passionate full stack developer with 5 years of experience in creating robust and scalable web applications. My expertise includes React, Node.js, and Python.</p>
            <p>When I'm not coding, you can find me hiking in the mountains or experimenting with new recipes in the kitchen.</p>
          </div>
        </div>
      </section>

      
      {/* Projects Section */}
      <section className={`portfolio__section dark-mode-projects ${isDarkMode ? 'dark-mode-projects' : 'light-mode-projects'}`}>
      <img src={waveOne} alt="image d'une vague" className="portfolio__wave" />
      <h2 className="portfolio__section-title">My Projects</h2>
        <div className="portfolio__projects">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              className="portfolio__projects-item"
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
      <section className="portfolio__section">
      <img src={waveTwo} alt="image d'une vague" className="portfolio__wave" />
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
      <footer className="portfolio__footer">
        <div className="portfolio__footer-container">
          <p className="portfolio__copyright">&copy; 2023 Jane Doe. All rights reserved.</p>
          <div className="portfolio__social-links">
            <a href="#" className="portfolio__social-link"><Github className="h-6 w-6" /></a>
            <a href="#" className="portfolio__social-link"><Linkedin className="h-6 w-6" /></a>
            <a href="#" className="portfolio__social-link"><Mail className="h-6 w-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}