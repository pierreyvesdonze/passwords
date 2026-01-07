import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedTextComponent from "../../../utils/AnimatedTextComponent";
import { motion } from "framer-motion";

export default function Level14() {
  const texts = [
    "Félicitations !",
    "Vous avez trouvé tous les mots de passe.",
    "Votre curiosité et votre perspicacité ont été récompensées.",
    "Merci d'avoir joué et d'avoir exploré tous les secrets de ce jeu.",
    "Peut-être que certains mystères resteront irrésolus…",
    "À bientôt pour de nouvelles aventures !",
  ];

  const [showButton, setShowButton] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // Fonction pour passer au texte suivant après la fin de l'animation
    const nextText = () => {
      if (currentTextIndex < texts.length - 1) {
        setTimeout(() => {
          setCurrentTextIndex(currentTextIndex + 1);
        }, 4500);
      } /* else {
        setShowButton(true);
      } */
    };

    // Appeler la fonction pour passer au texte suivant après la fin de l'animation
    nextText();

    return () => clearTimeout();
  }, [currentTextIndex, texts.length, showButton]);

  return (
    <motion.div
      className="level14-container-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="level14-container">
        <AnimatedTextComponent
          key={currentTextIndex}
          text={texts[currentTextIndex]}
        />

{/*         {showButton && (
          <Link to="/level15" className="level14-link">
            Continuer
          </Link>
        )} */}
      </div>
    </motion.div>
  );
}
