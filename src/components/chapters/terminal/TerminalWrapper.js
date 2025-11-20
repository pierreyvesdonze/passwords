import React, { useState } from "react";
import TerminalInput from "./TerminalInput";
import TerminalDisplay from "./TerminalDisplay";
import { registry } from "../../../utils/registry";
import { levels } from "./levels";

export default function TerminalWrapper({ levelNumber, onLevelComplete }) {
  const levelData = levels[levelNumber].levelData;
  const password = levels[levelNumber].password;
  const successMessage = levels[levelNumber].successMessage;

  const [history, setHistory] = useState([
    "SYSTEM v1.0.15 — ACCESS REQUIRED",
    "Tape 'help' pour voir les commandes."
  ]);

  const [currentPath, setCurrentPath] = useState(levelData.startPath);

  const runCommand = (input) => {
    const [cmd, ...args] = input.trim().split(" ");
    let output = "";

    // --- Vérification du mot de passe ici ---
    if (input.trim() === password) {
      output = successMessage;

      setHistory((h) => [...h, `> ${input}`, output]);

      // redirection automatique **après 2 secondes**
      setTimeout(() => {
        onLevelComplete(levelNumber);
      }, 2000);

      return;
    }

    // --- commandes normales ---
    if (registry[cmd]) {
      output = registry[cmd](args, currentPath, setCurrentPath, levelData);
    } else {
      output = `Unknown command: ${cmd}`;
    }

    setHistory((h) => [...h, `> ${input}`, output]);
  };

  return (
    <div className="terminal-wrapper">
      <TerminalDisplay history={history} />
      <TerminalInput runCommand={runCommand} />
    </div>
  );
}