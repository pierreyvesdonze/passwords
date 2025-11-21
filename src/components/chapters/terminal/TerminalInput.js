import React, { useState, useRef, useEffect } from "react";

export default function TerminalInput({ runCommand, currentPath }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      runCommand(input);
      setInput("");
    }
  };

  return (
    <div style={{ display: "flex", padding: "0 1rem 1rem 1rem", fontFamily: "monospace", color: "#0f0" }}>
      <span>{`ROOT ${currentPath} > `}</span>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ background: "black", color: "#0f0", border: "none", outline: "none", flex: 1, fontFamily: "monospace" }}
        autoFocus
      />
    </div>
  );
}
