import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "./grid/Grid";
import FoundPanel from "./grid/FoundPanel";
import useWordSearch from "./grid/useWordSearch";

export default function Level7() {
  const navigate = useNavigate();

  const {
    grid,
    gridSize,
    handleCellClick,
    isCellSelected,
    isCellFound,
    foundWords,
    setFoundWords,
    passwordCoords,
    showPassword,
    setShowPassword,
    wordsList,
    resetSelection,
  } = useWordSearch();

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const CORRECT = "pouvoir";

  function handlePasswordSubmit(e) {
    e.preventDefault();
    const userInput = password.toLowerCase().trim();

    if (userInput === CORRECT) {
      localStorage.setItem("currentLevel", "8");
      navigate("/level8");
      return;
    }

    setError(true);
    setTimeout(() => setError(false), 700);
  }

  // Autoplay : trouve tous les mots et révèle le mot final
  useEffect(() => {
    if (password.toLowerCase().trim() === "autoplay") {
      setFoundWords(wordsList);
      setShowPassword(true);
      setPassword(""); // optionnel : efface l'input pour plus de clarté
    }
  }, [password, wordsList, setFoundWords, setShowPassword]);

  return (
    <div className="power-layout">
      <div className="power-left">
        <h2 className="power-title">Niveau 7</h2>

        <Grid
          grid={grid}
          gridSize={gridSize}
          onCellClick={handleCellClick}
          isCellSelected={isCellSelected}
          isCellFound={isCellFound}
          passwordCoords={passwordCoords}
          showPassword={showPassword}
        />

        <div className="power-controls">
          <button className="power-btn" onClick={resetSelection}>
            Reset
          </button>
        </div>
      </div>

      <div className="power-right">
        <FoundPanel wordsList={wordsList} foundWords={foundWords} />

        <form onSubmit={handlePasswordSubmit} className="power-password-form">
          <input
            type="text"
            placeholder="Mot de passe..."
            className={`power-password-input ${error ? "power-error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="power-password-btn">Valider</button>
        </form>
      </div>
    </div>
  );
}
