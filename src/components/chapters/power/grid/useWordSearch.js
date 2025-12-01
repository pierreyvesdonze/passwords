import { useState, useMemo, useCallback } from "react";
import { generateGrid } from "./generateGrid";
import { WORDS, FINAL, anyWordStartsWith } from "./wordUtils";

const GRID_SIZE = 18;

export default function useWordSearch() {
  const { grid: initialGrid, finalCoords, size } = useMemo(() => generateGrid(GRID_SIZE, WORDS, FINAL), []);
  const [grid] = useState(initialGrid);
  const [selected, setSelected] = useState([]); // array of [r,c]
  const [foundWords, setFoundWords] = useState([]); // array of strings
  const [showPassword, setShowPassword] = useState(false);

  // helper
  function coordKey([r,c]) { return `${r},${c}`; }
  function isCoordEqual(a,b) { return a[0] === b[0] && a[1] === b[1]; }

  // returns current selection string
  const currentString = useMemo(() => {
    return selected.map(([r,c]) => grid[r][c]).join("");
  }, [selected, grid]);

  const remainingWords = useMemo(() => WORDS.filter(w => !foundWords.includes(w)), [foundWords]);

  // check if clicking [r,c] is valid continuation
  const handleCellClick = useCallback((r,c) => {
    const last = selected.length ? selected[selected.length - 1] : null;
    if (last && last[0] === r && last[1] === c) {
      // unselect last
      setSelected(selected.slice(0, -1));
      return;
    }

    const newSel = [...selected, [r,c]];
    const newString = newSel.map(([rr,cc]) => grid[rr][cc]).join("");

    if (!anyWordStartsWith(newString, remainingWords)) {
      // invalid continuation -> reset selection
      setSelected([]);
      return;
    }

    // valid continuation -> accept
    setSelected(newSel);

    const match = remainingWords.find(w => w === newString);
    if (match) {
      setFoundWords(prev => [...prev, match]);
      setSelected([]);
      if (foundWords.length + 1 === WORDS.length) {
        setShowPassword(true);
      }
    }
  }, [selected, grid, remainingWords, foundWords]);

  const resetSelection = useCallback(() => setSelected([]), []);

  const isCellSelected = useCallback((r,c) => selected.some(([rr,cc]) => rr===r && cc===c), [selected]);
  const isCellFound = useCallback((r,c) => {
    for (const w of foundWords) {
      const len = w.length;
      for (let rr = 0; rr < size; rr++) {
        for (let cc = 0; cc < size; cc++) {
          const dirs = [[1,0],[0,1],[1,1],[-1,0],[0,-1],[-1,-1],[1,-1],[-1,1]];
          for (const [dx,dy] of dirs) {
            let ok = true;
            for (let i=0;i<len;i++) {
              const r2 = rr + dy*i;
              const c2 = cc + dx*i;
              if (r2 < 0 || c2 < 0 || r2 >= size || c2 >= size || grid[r2][c2] !== w[i]) {
                ok = false; break;
              }
            }
            if (ok) {
              for (let i=0;i<len;i++) {
                const r2 = rr + dy*i;
                const c2 = cc + dx*i;
                if (r2 === r && c2 === c) return true;
              }
            }
          }
        }
      }
    }
    return false;
  }, [foundWords, grid, size]);

  return {
    grid,
    gridSize: size,
    handleCellClick,
    isCellSelected,
    isCellFound,
    foundWords,
    setFoundWords,     // ← expose setter pour autoplay
    passwordCoords: finalCoords || [],
    showPassword,
    setShowPassword,   // ← expose setter pour autoplay
    wordsList: WORDS,
    resetSelection
  };
}
