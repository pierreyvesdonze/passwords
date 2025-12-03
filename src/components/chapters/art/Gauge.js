import React, { useEffect, useRef } from "react";

export default function Gauge({ value }) {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const phaseRef = useRef(Math.random() * Math.PI * 2);
  const ampRef = useRef(Math.random() * 0.03 + 0.02); // amplitude aléatoire
  const freqRef = useRef(Math.random() * 2 + 1); // fréquence oscillation légèrement aléatoire

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = 100;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    // Cercle du cadran avec fond blanc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#dcdddaff"; // fond du cercle
    ctx.fill();
    ctx.strokeStyle = "#050505ff"; // contour noir
    ctx.lineWidth = 2;
    ctx.stroke();

    // Graduations
    for (let i = 0; i <= 10; i++) {
      const angle = Math.PI * 0.75 + (i / 10) * Math.PI * 1.5;
      const x1 = centerX + Math.cos(angle) * (radius - 5);
      const y1 = centerY + Math.sin(angle) * (radius - 5);
      const x2 = centerX + Math.cos(angle) * radius;
      const y2 = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#0d0e0dff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Aiguille
    const maxVal = 100;
    let progress = value / maxVal;
    let angle = Math.PI * 0.75 + progress * Math.PI * 1.5;

    // Oscillation si max
    if (value >= maxVal) {
      const t = Date.now() / 300; // vitesse oscillation
      angle += Math.sin(t * freqRef.current + phaseRef.current) * ampRef.current;
    }

    const needleLength = radius - 15;
    const needleX = centerX + Math.cos(angle) * needleLength;
    const needleY = centerY + Math.sin(angle) * needleLength;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = value >= maxVal ? "rgba(0, 189, 0, 1)" : "#f00";
    ctx.lineWidth = 3;
    ctx.shadowColor = value >= maxVal ? "rgba(0, 189, 0, 1)" : "#f00";
    ctx.shadowBlur = 10;
    ctx.stroke();

    requestRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, [value]);

  return <canvas ref={canvasRef} style={{ margin: "0.5rem" }} />;
}
