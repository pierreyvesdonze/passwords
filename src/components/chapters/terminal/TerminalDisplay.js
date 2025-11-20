import React from "react";

export default function TerminalDisplay({ history }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", whiteSpace: "pre-wrap", color: "#0f0", fontFamily: "monospace", padding: "1rem" }}>
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
