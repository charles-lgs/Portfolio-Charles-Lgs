"use client"

import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./Button"
import "../sass/NightModeToggle.scss"

interface NightModeToggleProps {
  onToggle: (isDark: boolean) => void;
}

const NightModeToggle: React.FC<NightModeToggleProps> = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleNightMode = () => {
    setIsDarkMode(!isDarkMode)
    onToggle(!isDarkMode)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleNightMode}
      className="button--icon-round"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className={`icon--toggle ${
          isDarkMode ? "button--dark-mode-banner" : ""
        }`} />
      ) : (
        <Moon className="icon--toggle" />
      )}
    </Button>
  )
}

export default NightModeToggle;