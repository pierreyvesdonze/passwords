import { useState, useMemo, useCallback } from "react";
import { generateGrid } from "./generateGrid";
import { WORDS, FINAL } from "./wordUtils";

const GRID_SIZE = 18;

export default function useWordSearch() {
  const { grid: initialGrid, finalCoords, size } = useMemo(
    () => generateGrid(GRID_SIZE, WORDS, FINAL),
    []
  );

  const [grid] = useState(initialGrid);
  const [selected, setSelected] = useState([]); // [[r,c], ...]
  const [foundWords, setFoundWords] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  // helper
  const coordKey = ([r, c]) => `${r},${c}`;

  const currentString = useMemo(
    () => selected.map(([r, c]) => grid[r][c]).join(""),
    [selected, grid]
  );

  const remainingWords = useMemo(
    () => WORDS.filter((w) => !foundWords.includes(w)),
    [foundWords]
  );

  const handleCellClick = useCallback(
    (r, c) => {
      // si déjà sélectionnée à la fin, désélectionner
      const last = selected[selected.length - 1];
      if (last && last[0] === r && last[1] === c) {
        setSelected((prev) => prev.slice(0, -1));
        return;
      }

      const newSelected = [...selected, [r, c]];
      const seq = newSelected.map(([rr, cc]) => grid[rr][cc]).join("");

      // Vérifie si la séquence peut correspondre à un mot restant
      const stillPossible = remainingWords.some((w) =>
        w.startsWith(seq)
      );

      if (stillPossible) {
        setSelected(newSelected);

        // si séquence correspond exactement à un mot restant
        const exact = remainingWords.find((w) => w === seq);
        if (exact) {
          setFoundWords((prev) => [...prev, exact]);
          setSelected([]); // reset sélection

          // si tous les mots trouvés, afficher mot de passe
          if (foundWords.length + 1 === WORDS.length) {
            setShowPassword(true);
          }
        }
      } else {
        // séquence invalide -> reset sélection
        setSelected([]);
      }
    },
    [selected, grid, remainingWords, foundWords]
  );

  const resetSelection = useCallback(() => setSelected([]), []);

  const isCellSelected = useCallback(
    (r, c) => selected.some(([rr, cc]) => rr === r && cc === c),
    [selected]
  );

  const isCellFound = useCallback(
    (r, c) => {
      for (const w of foundWords) {
        const len = w.length;
        for (let rr = 0; rr < size; rr++) {
          for (let cc = 0; cc < size; cc++) {
            const dirs = [
              [1, 0],
              [0, 1],
              [1, 1],
              [-1, 0],
              [0, -1],
              [-1, -1],
              [1, -1],
              [-1, 1],
            ];
            for (const [dx, dy] of dirs) {
              let ok = true;
              for (let i = 0; i < len; i++) {
                const r2 = rr + dy * i;
                const c2 = cc + dx * i;
                if (
                  r2 < 0 ||
                  c2 < 0 ||
                  r2 >= size ||
                  c2 >= size ||
                  grid[r2][c2] !== w[i]
                ) {
                  ok = false;
                  break;
                }
              }
              if (ok) {
                for (let i = 0; i < len; i++) {
                  const r2 = rr + dy * i;
                  const c2 = cc + dx * i;
                  if (r2 === r && c2 === c) return true;
                }
              }
            }
          }
        }
      }
      return false;
    },
    [foundWords, grid, size]
  );

  return {
    grid,
    gridSize: size,
    handleCellClick,
    isCellSelected,
    isCellFound,
    foundWords,
    passwordCoords: finalCoords || [],
    showPassword,
    wordsList: WORDS,
    resetSelection,
  };
}
