import React, { useState, useRef, useEffect } from "react";

export default function TerminalInput({
  runCommand,
  currentPath,
  levelNumber,
  textColor,
  pushToHistory,
}) {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(null);
  const [commandHistory, setCommandHistory] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    // ENTER → execute
    if (e.key === "Enter" && input.trim() !== "") {
      // on envoie la commande au moteur principal
      runCommand(input);

      // on garde la commande pour la flèche up
      setCommandHistory((prev) => [...prev, input]);
      // on ajoute aussi une ligne dans l'historique (optionnel, TerminalWrapper le fait déjà)
      // pushToHistory && pushToHistory(`ROOT ${currentPath} > ${input}`);

      setInput("");
      setHistoryIndex(null);
      return;
    }

    // UP ARROW → last command
    if (e.key === "ArrowUp") {
      if (commandHistory.length === 0) return;

      const idx =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(idx);
      setInput(commandHistory[idx]);
      return;
    }

    // DOWN ARROW → next command in history
    if (e.key === "ArrowDown") {
      if (commandHistory.length === 0) return;

      if (historyIndex === null) {
        setInput("");
        return;
      }

      const idx = Math.min(commandHistory.length - 1, historyIndex + 1);
      setHistoryIndex(idx === commandHistory.length - 1 ? null : idx);
      setInput(idx === commandHistory.length - 1 ? "" : commandHistory[idx]);
      return;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "0 1rem 1rem 1rem",
        fontFamily: "Montserrat Alternates",
        color: textColor || (levelNumber >= 9 ? "#0ff" : "#0f0"),
      }}
    >
      <span style={{ marginRight: 6 }}>{`ROOT ${currentPath} > `}</span>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          background: "black",
          color: textColor || (levelNumber >= 9 ? "#0ff" : "#0f0"),
          border: "none",
          outline: "none",
          flex: 1,
          fontFamily: "Montserrat Alternates",
          fontSize: "1em"
        }}
        autoFocus
      />
    </div>
  );
}
