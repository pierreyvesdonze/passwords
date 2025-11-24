import React from "react";

export default function Level6Player({ show, isPlaying, onPlayClick }) {
  return (
    <div
      className={`guerre-player ${show ? "guerre-visible" : "guerre-hidden"}`}
    >
      <button className="guerre-btn-play" onClick={onPlayClick}>
        {isPlaying ? "⏸︎ Pause" : "▶︎ Play Morse"}
      </button>
    </div>
  );
}