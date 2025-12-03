import React, { useState } from "react";
import { motion } from "framer-motion";
import LetterCanvas from "./LetterCanvas";
import LetterControls from "./LetterControls";
import { useNavigate } from "react-router-dom";

export default function Level8() {
  const navigate = useNavigate();

  const letters = ["A", "R", "T"];
  const [progress, setProgress] = useState({ A: 0, R: 0, T: 0 });
  const [switchIS, setSwitchIS] = useState({ I: false, S: false });
  const [inputValue, setInputValue] = useState("");

  // Nouveau : état glitch
  const [isGlitching, setIsGlitching] = useState(false);

  const isUnlocked =
    progress.A === 100 &&
    progress.R === 100 &&
    progress.T === 100 &&
    switchIS.I &&
    switchIS.S;

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // ON LANCE LE GLITCH
    setIsGlitching(true);

    // Après 3 secondes → navigate
    setTimeout(() => {
      localStorage.setItem("level8_word", inputValue.trim());
      localStorage.setItem("currentLevel", "9");
      navigate("/level9");
    }, 3000);
  };

  const updateProgress = (letter, value) => {
    setProgress((prev) => ({ ...prev, [letter]: parseInt(value) }));
  };

  const toggleSwitch = (letter) => {
    setSwitchIS((prev) => ({ ...prev, [letter]: !prev[letter] }));
  };

  return (
    <motion.div
      className={`level8-container ${isGlitching ? "glitch-wrapper-art" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "2rem",
        fontFamily: "Montserrat Alternates",
        boxSizing: "border-box",
      }}
    >
      <div
        className={isGlitching ? "glitch-inner-art" : ""}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          width: "80%",
          maxWidth: "1200px",
        }}
      >
        <div className={isGlitching ? "glitch-block-art" : ""} style={{ flex: 1 }}>
          <LetterCanvas
            progress={progress}
            switches={switchIS}
            inputValue={inputValue}
            isUnlocked={isUnlocked}
            glitch={isGlitching}
          />
        </div>

        <div
          className={isGlitching ? "glitch-controls-art" : ""}
          style={{ flex: 0.4 }}
        >
          <LetterControls
            letters={letters}
            progress={progress}
            onChange={updateProgress}
            switches={switchIS}
            onSwitchChange={toggleSwitch}
            glitch={isGlitching}
          />

          {isUnlocked && (
            <div
              className={isGlitching ? "glitch-inputzone-art" : ""}
              style={{ marginTop: "2rem" }}
            >
              <input
                type="text"
                placeholder="Art is ... ?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                maxLength={120}
                className={isGlitching ? "glitch-input-art" : ""}
                style={{
                  padding: "0.6rem 1rem",
                  width: "220px",
                  background: "#111",
                  border: "1px solid #0f0",
                  color: "#0f0",
                  borderRadius: "6px",
                  fontFamily: "Montserrat Alternates",
                }}
              />
              <button
                onClick={handleSubmit}
                className={isGlitching ? "glitch-button-art" : ""}
                style={{
                  marginLeft: "10px",
                  padding: "0.6rem 1rem",
                  background: "#0f0",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                Go
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
