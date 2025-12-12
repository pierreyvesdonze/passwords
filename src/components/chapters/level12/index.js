import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Level12() {
  const [inputValue, setInputValue] = useState("");
  const [storedWord, setStoredWord] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("level8_word") || "";
    setStoredWord(saved);
  }, []);

  const handleSubmit = () => {
    if (inputValue.trim() === storedWord.trim()) {
      // mot correct → on sauvegarde et on avance
      localStorage.setItem("currentLevel", "13");
      navigate("/level13");
    } else {
      // mot incorrect → petite vibe de honte visuelle
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="level12-container"
    >
      <h3 className="level12-h3">Art is ... ?</h3>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="mot de passe"
        className={`level12-input ${error ? "level12-error" : "level12-ok"}`}
      />

      <Link to="/level8" className="level12-forgot">
        mot de passe oublié
      </Link>
    </motion.div>
  );
}
