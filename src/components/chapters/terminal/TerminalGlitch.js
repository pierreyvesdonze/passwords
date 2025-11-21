import React, { useState, useEffect } from "react";

function randomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}<>?/\\|";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

export default function TerminalGlitch({ textLines, onComplete, duration = 2000 }) {
  const [glitchLines, setGlitchLines] = useState([]);

  useEffect(() => {
    // initialise chaque lettre avec un objet {original, current, speed}
    const letters = textLines.map((line) =>
      line.split("").map((c) => ({
        original: c,
        current: c,
        speed: 10 + Math.random() * 50, // vitesse aléatoire
      }))
    );
    setGlitchLines(letters);

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const updated = letters.map((line) =>
        line.map((letter) => {
          if (Math.random() < 0.3 || elapsed > duration * 0.8) {
            // certaines lettres reviennent à l'original
            return { ...letter, current: letter.original };
          }
          return { ...letter, current: randomChar() };
        })
      );
      setGlitchLines(updated);

      if (elapsed >= duration) {
        clearInterval(interval);
        onComplete(); // déclenche le niveau suivant
      }
    }, 30);

    return () => clearInterval(interval);
  }, [textLines, duration, onComplete]);

  return (
    <div
      style={{
        background: "black",
        color: "#0f0",
        fontFamily: "monospace",
        padding: "1rem",
        whiteSpace: "pre-wrap",
        height: "100vh"
      }}
    >
      {glitchLines.map((line, i) => (
        <div key={i}>
          {line.map((letter, j) => (
            <span key={j}>{letter.current}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
