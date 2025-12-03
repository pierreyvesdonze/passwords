import React, { useEffect, useRef } from "react";

// Fragments pour chaque lettre A/R/T
const LETTER_FRAGMENTS = {
  A: [
    { char: "|", targetX: 0, targetY: 0 },
    { char: "|", targetX: 20, targetY: 0 },
    { char: "/", targetX: -10, targetY: 20 },
    { char: "\\", targetX: 30, targetY: 20 },
    { char: "o", targetX: 10, targetY: 10 },
    { char: "°", targetX: 5, targetY: 15 },
    { char: "°", targetX: 15, targetY: 15 },
    { char: "|", targetX: 10, targetY: 20 },
    { char: "-", targetX: 0, targetY: 25 },
    { char: "-", targetX: 20, targetY: 25 },
  ],
  R: [
    { char: "R", targetX: 0, targetY: 0 },
    { char: "|", targetX: 0, targetY: 5 },
    { char: "°", targetX: 5, targetY: 10 },
    { char: "/", targetX: 10, targetY: 15 },
    { char: "-", targetX: 5, targetY: 20 },
  ],
  T: [
    { char: "T", targetX: 0, targetY: 0 },
    { char: "-", targetX: -5, targetY: 0 },
    { char: "-", targetX: 5, targetY: 0 },
    { char: "|", targetX: 0, targetY: 10 },
    { char: "|", targetX: 0, targetY: 15 },
  ],
};

// Initialisation aléatoire des offsets pour explosion de fragments
const INITIAL_OFFSETS = {};
Object.keys(LETTER_FRAGMENTS).forEach(letter => {
  INITIAL_OFFSETS[letter] = LETTER_FRAGMENTS[letter].map(() => ({
    xOffset: Math.random() * 200 - 100,
    yOffset: Math.random() * 100 - 50,
  }));
});

export default function LetterCanvas({ progress, switches, inputValue, isUnlocked }) {
  const canvasRef = useRef();

  // Décalage vertical global pour remonter toutes les lettres ASCII
  const asciiOffsetY = -80; // <-- change cette valeur pour ajuster la hauteur

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + asciiOffsetY; // applique le décalage

    const lettersArr = Object.keys(LETTER_FRAGMENTS);
    const spacing = 120;

    // Dessin des fragments A/R/T
    lettersArr.forEach((letter, idx) => {
      const fragments = LETTER_FRAGMENTS[letter];
      const offsetX = (idx - 1) * spacing;
      const offsetY = 0;

      fragments.forEach((f, i) => {
        const initOffset = INITIAL_OFFSETS[letter][i];
        const x0 = centerX + offsetX + initOffset.xOffset;
        const y0 = centerY + offsetY + initOffset.yOffset;
        const targetX = centerX + offsetX + f.targetX;
        const targetY = centerY + offsetY + f.targetY;

        const ellipseX = Math.cos((progress[letter] / 100) * Math.PI * 2) * 8;
        const ellipseY = Math.sin((progress[letter] / 100) * Math.PI * 2) * 5;

        const x = x0 + (targetX - x0) * (progress[letter] / 100) + ellipseX;
        const y = y0 + (targetY - y0) * (progress[letter] / 100) + ellipseY;

        ctx.fillStyle = "#0f0";
        ctx.font = "20px Montserrat Alternates";
        ctx.fillText(f.char, x, y);
      });
    });

    // Affichage I/S rouges sous ART
    ctx.font = "20px Montserrat Alternates";
    const baseISY = centerY + 80; // position verticale des I/S
    let offsetX = 0;

    if (switches?.I) {
      offsetX -= 20;
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText("I", centerX + offsetX, baseISY);
    }
    if (switches?.S) {
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillText("S", centerX + offsetX + 40, baseISY);
    }

    // 🔥 AJOUT — dessin du faux input dans le canvas
    if (isUnlocked) {
      const inputWidth = 220;
      const inputHeight = 40;

      const inputX = centerX - inputWidth / 2;
      const inputY = baseISY + 70; // légèrement plus bas, comme demandé

      // Fond
      ctx.fillStyle = "#111";
      ctx.fillRect(inputX, inputY, inputWidth, inputHeight);

      // Bordure
      ctx.strokeStyle = "#0f0";
      ctx.lineWidth = 2;
      ctx.strokeRect(inputX, inputY, inputWidth, inputHeight);

      // Texte (contenu du vrai input)
      ctx.fillStyle = "#0f0";
      ctx.font = "18px Montserrat Alternates";
      ctx.textAlign = "left";
      ctx.fillText(inputValue || "Art is what you want", inputX + 10, inputY + 26);
    }

  }, [progress, switches, inputValue, isUnlocked, asciiOffsetY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background: "#000",
        boxShadow: "0 0 14px #0f0",
      }}
    />
  );
}
