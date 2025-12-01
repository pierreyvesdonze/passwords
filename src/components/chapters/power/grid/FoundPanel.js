import React from "react";

export default function FoundPanel({ wordsList, foundWords }) {
  return (
    <div className="power-panel">
      <div className="power-panel-inner">
        <h3 className="power-panel-title">FOUND SIGNALS</h3>

        <div className="power-panel-listed">
          {wordsList.map(w => {
            const found = foundWords.includes(w);
            return (
              <div key={w} className={`power-panel-line ${found ? "power-found" : ""}`}>
                <span className="power-panel-word">{w}</span>
                <span className="power-panel-dot">{found ? "●" : "○"}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
