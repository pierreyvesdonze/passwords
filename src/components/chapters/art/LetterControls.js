import React from "react";
import Gauge from "./Gauge";

export default function LetterControls({
  letters,
  progress,
  onChange,
  switches,
  onSwitchChange,
}) {
  return (
    <div
      className="controls-wrapper-art"
      style={{
        flex: 3,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      {/* Curseurs A/R/T */}
      {letters.map((_, idx) => (
        <div key={idx} style={{ width: "80%", textAlign: "center" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={progress[letters[idx]]}
            onChange={(e) => onChange(letters[idx], e.target.value)}
            style={{
              width: "100%",
              accentColor: "#0f0",
            }}
          />
        </div>
      ))}

      {/* Manomètres */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginTop: "2rem",
        }}
      >
        {letters.map((letter, idx) => (
          <Gauge key={idx} value={progress[letter]} />
        ))}
      </div>

      {/* Switchs I/S */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "2rem",
          justifyContent: "center",
        }}
      >
        {["I", "S"].map((letter) => (
          <button
            key={letter}
            onClick={() => onSwitchChange(letter)}
            style={{
              width: "60px",
              height: "30px",
              borderRadius: "15px",
              backgroundColor: switches[letter]
                ? "rgba(5, 187, 5, 1)"
                : "rgb(52, 5, 5)",
              color: "#fff",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: switches[letter] ? "32px" : "4px",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                transition: "left 0.2s",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
