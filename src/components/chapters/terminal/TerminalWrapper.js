import React, { useState } from "react";
import TerminalInput from "./TerminalInput";
import TerminalDisplay from "./TerminalDisplay";
import TerminalGlitch from "./TerminalGlitch";
import { registry } from "../../../utils/registry";
import { levels } from "./levels";

export default function TerminalWrapper({ levelNumber, onLevelComplete }) {
  const levelData = levels[levelNumber].levelData;
  const password = levels[levelNumber].password;
  const successMessage = levels[levelNumber].successMessage;

  // couleur texte centralisée pour éviter disparités
  const textColor = levelNumber >= 9 ? "#0ff" : "#0f0";

  // intro calculée avant useState pour être sûre d'être utilisée
  const introMessage =
    levelNumber >= 9
      ? "SYSTEM v2.3.11 — ACCESS FORBIDDEN"
      : "SYSTEM v1.0.15 — ACCESS REQUIRED";

  // useState initialisé via fonction pour garantir les valeurs au montage
  const [history, setHistory] = useState(() => [
    introMessage,
    "Tape 'help' pour voir les commandes.",
    levelData.enigme || "",
  ]);

  const [currentPath, setCurrentPath] = useState(levelData.startPath);
  const [showGlitch, setShowGlitch] = useState(false);

  const runCommand = (input) => {
    const trimmed = input.trim();

    // --- Cas spécial : accent interdit pour SOCIETE ---
    if (trimmed.toLowerCase() === "société") {
      setHistory((prev) =>
        prev.map((line) =>
          line.includes("plus rien n'a d'accent")
            ? line.replace(
                "plus rien n'a d'accent",
                `<span style="color:red">plus rien n'a d'accent</span>`
              )
            : line
        )
      );

      setHistory((h) => [
        ...h,
        `ROOT ${currentPath} > ${input}`,
        "Unknown command: société",
      ]);

      return;
    }

    // --- Vérification du mot de passe ---
    if (trimmed === password) {
      const output = successMessage;

      setHistory((h) => [...h, `ROOT ${currentPath} > ${input}`, output]);

      if (levelNumber === 4) {
        setShowGlitch(true);
        return;
      }

      setTimeout(() => {
        onLevelComplete(levelNumber);
      }, 2000);

      return;
    }

    // --- Commandes normales ---
    let output = "";
    const [cmd, ...args] = trimmed.split(" ");

    if (registry[cmd]) {
      output = registry[cmd](
        args,
        currentPath,
        setCurrentPath,
        levelData,
        levelNumber
      );
    } else {
      output = `Unknown command: ${cmd}`;
    }

    setHistory((h) => [...h, `ROOT ${currentPath} > ${input}`, output]);
  };

  if (showGlitch) {
    return (
      <TerminalGlitch
        textLines={history}
        duration={2500}
        onComplete={() => onLevelComplete(levelNumber)}
      />
    );
  }

  return (
    <div
      className="terminal-wrapper"
      style={{
        color: textColor,
      }}
    >
      <TerminalDisplay history={history} textColor={textColor} />
      <TerminalInput
        runCommand={runCommand}
        currentPath={currentPath}
        levelNumber={levelNumber}
        textColor={textColor}
        pushToHistory={(line) => setHistory((h) => [...h, line])}
      />
    </div>
  );
}
