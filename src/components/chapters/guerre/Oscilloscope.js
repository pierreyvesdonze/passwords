import React, { useEffect, useRef, useState } from "react";

export default function Oscilloscope({ onSyncChange }) {
  const canvasRef = useRef(null);

  const [freqUser, setFreqUser] = useState(1.1);
  const freqFixed = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let frame = 0;
    let animation;

    const draw = () => {
      frame++;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Axe horizontal
      ctx.strokeStyle = "#222";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // On snap la fréquence si proche
      const effectiveFreq =
        Math.abs(freqUser - freqFixed) < 0.01 ? freqFixed : freqUser;

      // Les deux sinusoïdes sont calculées sur la même phase
      for (let i = 0; i < 2; i++) {
        ctx.strokeStyle = i === 0 ? "#4cff4c" : "#66aaff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const freq = i === 0 ? freqFixed : effectiveFreq;
          const y = canvas.height / 2 + Math.sin((x + frame * 2) * (freq / 40)) * 40;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const synced = Math.abs(freqUser - freqFixed) < 0.01;
      onSyncChange(synced);

      animation = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animation);
  }, [freqUser, onSyncChange]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={180}
        style={{
          background: "black",
          border: "2px solid #444",
          borderRadius: "8px",
          display: "block",
          margin: "auto",
        }}
      ></canvas>

      <div style={{ marginTop: "10px" }}>
        <input
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={freqUser}
          onChange={(e) => setFreqUser(parseFloat(e.target.value))}
          style={{ width: "300px" }}
        />
      </div>
    </div>
  );
}
