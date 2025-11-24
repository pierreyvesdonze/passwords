import React from "react";

export default function Level6Notice({ show, isSynced }) {
  return (
    <div
      className={`guerre-right-panel ${show ? "guerre-visible" : "guerre-hidden"}`}
    >
      <div className={`guerre-notice ${!isSynced ? "guerre-flicker" : ""}`}>
        <div className="guerre-notice-grid">
          <p>A : ● ▬</p>
          <p>B : ▬ ● ● ●</p>
          <p>C : ▬ ● ▬ ●</p>
          <p>D : ▬ ● ●</p>
          <p>E : ●</p>
          <p>F : ● ● ▬ ●</p>
          <p>G : ▬ ▬ ●</p>
          <p>H : ● ● ● ●</p>
          <p>I : ● ●</p>
          <p>J : ● ▬ ▬ ▬</p>
          <p>K : ▬ ● ▬</p>
          <p>L : ● ▬ ● ●</p>
          <p>M : ▬ ▬</p>
          <p>N : ▬ ●</p>
          <p>O : ▬ ▬ ▬</p>
          <p>P : ● ▬ ▬ ●</p>
          <p>Q : ▬ ▬ ● ▬</p>
          <p>R : ● ▬ ●</p>
          <p>S : ● ● ●</p>
          <p>T : ▬</p>
          <p>U : ● ● ▬</p>
          <p>V : ● ● ● ▬</p>
          <p>W : ● ▬ ▬</p>
          <p>X : ▬ ● ● ▬</p>
          <p>Y : ▬ ● ▬ ▬</p>
          <p>Z : ▬ ▬ ● ●</p>
        </div>
      </div>
    </div>
  );
}
