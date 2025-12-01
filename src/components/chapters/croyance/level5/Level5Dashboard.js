import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Level5Dashboard() {
  const navigate = useNavigate();
  const wordPairs = [
    ["plate", "globe"],
    ["dieu", "science"],
    ["destin", "hasard"],
    ["au-delà", "néant"],
    ["miracle", "statistique"],
    ["création", "évolution"],
    ["lumière", "ténèbres"],
    ["justice", "loi"],
    ["liberté", "surveillance"],
    ["écologie", "greenwashing"],
    ["sécurité", "isolement"],
    ["illusion", "réalité"],
    ["amour", "hormones"],
    ["génie", "travail"],
    ["sincérité", "masque"],
    ["vérité", "opinion"],
  ];

  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [validatedPairs, setValidatedPairs] = useState([]);
  const [buttonStates, setButtonStates] = useState({}); // "neutral" | "green" | "red"

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    const flatWords = wordPairs.flat();
    const mixed = shuffleArray(flatWords);
    setShuffledWords(mixed);

    const initStates = {};
    mixed.forEach((w) => (initStates[w] = "neutral"));
    setButtonStates(initStates);
  }, []);

  const setButtonColor = (word, color) => {
    setButtonStates((prev) => ({ ...prev, [word]: color }));
  };

  const handleWordClick = (word) => {
    if (selectedWords.length === 1 && selectedWords[0] === word) {
      setSelectedWords([]);
      setButtonColor(word, "neutral");
      return;
    }

    if (selectedWords.length === 0) {
      setSelectedWords([word]);
      setButtonColor(word, "green");
      return;
    }

    const first = selectedWords[0];
    const second = word;

    const correctPair = wordPairs.find(
      (p) => p.includes(first) && p.includes(second)
    );

    if (!correctPair) {
      setSelectedWords([first, second]);
      setButtonColor(first, "red");
      setButtonColor(second, "red");

      setTimeout(() => {
        setSelectedWords([]);
        setButtonColor(first, "neutral");
        setButtonColor(second, "neutral");
      }, 500);
      return;
    }

    setSelectedWords([first, second]);
    setButtonColor(first, "green");
    setButtonColor(second, "green");

    setTimeout(() => {
      setValidatedPairs((prev) => [...prev, `${first} + ${second}`]);
      const remaining = shuffledWords.filter((w) => w !== first && w !== second);
      setShuffledWords(remaining);

      setButtonStates((prev) => {
        const cp = { ...prev };
        delete cp[first];
        delete cp[second];
        return cp;
      });

      setSelectedWords([]);

      if (remaining.length === 0) {
        setValidatedPairs((prev) => [...prev, "Mot de passe : croyance"]);
      }
    }, 500);
  };

  const handleCombine = () => {
    if (shuffledWords.length === 0) {
      alert("Toutes les paires validées ! Vous pouvez taper le mot de passe final.");
    } else {
      setSelectedWords([]);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const val = e.target.value.trim().toLowerCase();
      if (val === "croyance") {
        localStorage.setItem("currentLevel", "6");
        navigate("/level6");
      } else {
        e.target.value = "";
        setSelectedWords([]);
      }
    }
  };

  const handleTest = () => {
    const remainingWords = [...shuffledWords];
    const newValidatedPairs = [...validatedPairs];

    while (remainingWords.length > 0) {
      const first = remainingWords[0];
      const correctPair = wordPairs.find(
        (p) =>
          p.includes(first) &&
          remainingWords.includes(p.find((w) => w !== first))
      );
      if (correctPair) {
        const second = correctPair.find((w) => w !== first);
        newValidatedPairs.push(`${first} + ${second}`);

        remainingWords.splice(remainingWords.indexOf(first), 1);
        remainingWords.splice(remainingWords.indexOf(second), 1);

        setButtonStates((prev) => {
          const cp = { ...prev };
          delete cp[first];
          delete cp[second];
          return cp;
        });
      }
    }

    setValidatedPairs([...newValidatedPairs, "Mot de passe : croyance"]);
    setShuffledWords([]);
    setSelectedWords([]);
  };

  return (
    <div className="level5-container">
      <div className="dashboard">
        <div className="buttons-panel">
          {shuffledWords.map((word) => (
            <button
              key={word}
              className={`word-btn ${buttonStates[word]}`}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </button>
          ))}
        </div>

        <div className="screen">
          {validatedPairs.map((line, i) => (
            <div key={i} className="screen-line">{line}</div>
          ))}
        </div>
      </div>

      <div className="combine-zone">
        <button className="combine-btn" onClick={handleCombine}>Combiner</button>
        <input
          className="final-input"
          placeholder="Mot de passe..."
          onKeyDown={handleInputKeyDown}
        />
      </div>
    </div>
  );
}
