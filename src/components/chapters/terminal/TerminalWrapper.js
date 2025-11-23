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

  const [history, setHistory] = useState([
    "SYSTEM v1.0.15 — ACCESS REQUIRED",
    "Tape 'help' pour voir les commandes.",
    levelData.enigme || "" // au cas où ton énigme est ici
  ]);

  const [currentPath, setCurrentPath] = useState(levelData.startPath);
  const [showGlitch, setShowGlitch] = useState(false);
  const runCommand = (input) => {
    const trimmed = input.trim();

    // --- Cas spécial : accent interdit pour SOCIETE ---
    if (trimmed.toLowerCase() === "société") {
      // on recolorie l'énigme existante sans rajouter de nouvelle énigme
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

      // message d'erreur dans l'historique
      setHistory((h) => [
        ...h,
        `ROOT ${currentPath} > ${input}`,
        "Unknown command: société",
      ]);

      return;
    }

    // --- Vérification du mot de passe normal ---
    if (trimmed === password) {
      const output = successMessage;

      setHistory((h) => [...h, `ROOT ${currentPath} > ${input}`, output]);

       // Si niveau 4, déclenchement du glitch
      if (levelNumber === 4) {
        setShowGlitch(true);
        return;
      }

      // redirection automatique après 2 sec
      setTimeout(() => {
        onLevelComplete(levelNumber);
      }, 2000);

      return;
    }

    // --- Commandes normales ---
    let output = "";
    const [cmd, ...args] = trimmed.split(" ");

    if (registry[cmd]) {
      output = registry[cmd](args, currentPath, setCurrentPath, levelData);
    } else {
      output = `Unknown command: ${cmd}`;
    }

    setHistory((h) => [...h, `ROOT ${currentPath} > ${input}`, output]);
  };

    // --- Affichage glitch si activé ---
  if (showGlitch) {
    return (
      <TerminalGlitch
        textLines={history}
        duration={2500} // durée de l'animation en ms
        onComplete={() => onLevelComplete(levelNumber)}
      />
    );
  }


  return (
    <div className="terminal-wrapper">
      <TerminalDisplay history={history} />
      <TerminalInput runCommand={runCommand} currentPath={currentPath} />
    </div>
  );
}
