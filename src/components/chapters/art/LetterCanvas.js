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
  const frameRef = useRef(0); // 🌟 AJOUT OSCILLATION — compteur de frames

  const asciiOffsetY = -80;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.5;

    let animationFrame;

    const animate = () => {
      frameRef.current += 0.03; // vitesse de l'oscillation
      const t = frameRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + asciiOffsetY;
      const lettersArr = Object.keys(LETTER_FRAGMENTS);
      const spacing = 120;

      const allDone =
        progress.A === 100 &&
        progress.R === 100 &&
        progress.T === 100;

      lettersArr.forEach((letter, idx) => {
        const fragments = LETTER_FRAGMENTS[letter];
        const offsetX = (idx - 1) * spacing;

        fragments.forEach((f, i) => {
          const initOffset = INITIAL_OFFSETS[letter][i];
          const x0 = centerX + offsetX + initOffset.xOffset;
          const y0 = centerY + initOffset.yOffset;
          const targetX = centerX + offsetX + f.targetX;
          const targetY = centerY + f.targetY;

          const progressRatio = progress[letter] / 100;

          const baseX = x0 + (targetX - x0) * progressRatio;
          const baseY = y0 + (targetY - y0) * progressRatio;

          // 🌟 AJOUT OSCILLATION — micro mouvement quand tout est complété
          let oscX = 0;
          let oscY = 0;

          if (allDone) {
            const amp = 3; // amplitude fine
            const freq = 1.5; // vitesse
            oscX = Math.sin(t + i * 0.8) * amp;
            oscY = Math.cos(t + i * 0.8) * amp;
          }

          ctx.fillStyle = "#0f0";
          ctx.font = "20px Montserrat Alternates";
          ctx.fillText(f.char, baseX + oscX, baseY + oscY);
        });
      });

      // I / S
      ctx.font = "20px Montserrat Alternates";
      const baseISY = centerY + 80;
      let offsetX = 0;

      if (switches?.I) {
        offsetX -= 20;
        ctx.fillStyle = "#fff";
        ctx.fillText("I", centerX + offsetX, baseISY);
      }

      if (switches?.S) {
        ctx.fillStyle = "#fff";
        ctx.fillText("S", centerX + offsetX + 40, baseISY);
      }

      // Faux input
      if (isUnlocked) {
        const inputWidth = 220;
        const inputHeight = 40;

        const inputX = centerX - inputWidth / 2;
        const inputY = baseISY + 70;

        ctx.fillStyle = "#111";
        ctx.fillRect(inputX, inputY, inputWidth, inputHeight);

        ctx.strokeStyle = "#0f0";
        ctx.lineWidth = 2;
        ctx.strokeRect(inputX, inputY, inputWidth, inputHeight);

        ctx.fillStyle = "#0f0";
        ctx.font = "18px Montserrat Alternates";
        ctx.textAlign = "left";
        ctx.fillText(inputValue || "Art is what you want", inputX + 10, inputY + 26);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [progress, switches, inputValue, isUnlocked]);

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